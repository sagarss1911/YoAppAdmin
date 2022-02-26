import { Component,OnInit,Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class PermissionHelper {

    constructor() {
    }

	private static _instance: PermissionHelper = null;
    public static getInstance(): PermissionHelper {
		if (PermissionHelper._instance === null) {
			PermissionHelper._instance = new PermissionHelper();
		}
		return PermissionHelper._instance;
	}

	getBooleanPermissions(key) {
		return (localStorage.getItem(key) == "true" ? true : false)
	}

	getObjectPermissions(key) {
		try {
			return JSON.parse(localStorage.getItem(key));
		} catch (e) {
			return {}
		}
	}

    setPermissions(permission_block) {
        if(!permission_block) {
    		return  false;
    	}

        let resume_permission = 0;
        let user_setup_permission = 0;
        let client_setup_permission = 0;
        let job_setup_permission = 0;
        let notification_setup_permission = 0;
        let contact_groups_setup_permission = 0;
        let contact_setup_permission = 0;
        let organization_data_management_permission = 0;
        let profile_management_permission = 0;
        let licence_management_permission = 0;
        let cards_management_permission = 0;
        let sender_management_permission = 0;
        let signature_management_permission = 0;
        let credits_management_permission = 0;
        let email_validation_credits_management_permission = 0;
        let message_management_permission = 0;
        let expense_management_permission = 0;
        if(permission_block["role_management"] && permission_block["role_management"].s) {
            localStorage.role_management_permission_block = JSON.stringify(permission_block["role_management"]);
            user_setup_permission = 1;
        }

        if(permission_block["resource"]) {
            localStorage.resource_permission_block = JSON.stringify(permission_block["resource"]);
        }

        if(permission_block["user_management"] && permission_block["user_management"].s) {
            localStorage.user_management_permission_block = JSON.stringify(permission_block["user_management"]);
            user_setup_permission = 1;
        }
        if(permission_block["organization_data_management"] && permission_block["organization_data_management"].gsod) {
          localStorage.organization_data_management_permission_block = JSON.stringify(permission_block["organization_data_management"]);
          organization_data_management_permission = 1;
        }


        if(permission_block["client_management"] && permission_block["client_management"].s) {
            localStorage.client_management_permission_block = JSON.stringify(permission_block["client_management"]);
            client_setup_permission = 1;
        }

        if(permission_block["job_management"] && permission_block["job_management"].s) {
            localStorage.job_management_permission_block = JSON.stringify(permission_block["job_management"]);
            job_setup_permission = 1;
        }

        if(permission_block["notification_management"] && permission_block["notification_management"].gn) {
            localStorage.notification_management_permission_block = JSON.stringify(permission_block["notification_management"]);
            notification_setup_permission = 1;
        }

        if(permission_block["contact_groups_management"] && permission_block["contact_groups_management"].cg_gcgwf) {
          localStorage.contact_groups_permission_block = JSON.stringify(permission_block["contact_groups_management"]);
          contact_groups_setup_permission  = 1;
        }

        if(contact_groups_setup_permission ) {
          localStorage.contact_groups_setup_permission  = true;
        }

        if(permission_block["contact_management"] && permission_block["contact_management"].c_gcwf) {
          localStorage.contact_permission_block = JSON.stringify(permission_block["contact_management"]);
          contact_setup_permission   = 1;
        }

        if(contact_setup_permission  ) {
          localStorage.contact_setup_permission   = true;
        }

        if(permission_block["expense_management"] && permission_block["expense_management"].gewf) {
          localStorage.expense_permission_block = JSON.stringify(permission_block["expense_management"]);
          expense_management_permission   = 1;
        }

        if(expense_management_permission) {
          localStorage.expense_management_permission   = true;
        }



        if(notification_setup_permission) {
            localStorage.notification_setup_permission = true;
        }

        if(permission_block["candidate"] &&  permission_block["candidate"].ga) {
            localStorage.resume_permission = true;
        }

        if(user_setup_permission) {
            localStorage.user_setup_permission = true;
        }

        if(organization_data_management_permission) {
          localStorage.organization_data_management_permission = true;
        }

        if(client_setup_permission) {
            localStorage.client_setup_permission = true;
        }

        if(job_setup_permission) {
            localStorage.job_setup_permission = true;
        }

        if(permission_block["candidate"]) {
            localStorage.candidate_permission_block = JSON.stringify(permission_block["candidate"]);
        }

        if(permission_block["interview"]) {
            permission_block["interview"].si = permission_block["interview"].si && permission_block["interview"].gq && permission_block["interview"].gat ? 1 : 0;
            localStorage.interview_permission_block = JSON.stringify(permission_block["interview"]);
        }


        if(permission_block["profile_management"] && permission_block["profile_management"].gp) {
          localStorage.profile_management_permission_block = JSON.stringify(permission_block["profile_management"]);
          profile_management_permission   = 1;
        }

        if(profile_management_permission  ) {
          localStorage.profile_management_permission = true;
        }

        if(permission_block["licence_management"] && permission_block["licence_management"].gol) {
          localStorage.licence_management_block = JSON.stringify(permission_block["licence_management"]);
          licence_management_permission   = 1;
        }

        if(licence_management_permission  ) {
          localStorage.licence_management_permission   = true;
        }

        if(permission_block["cards_management"] && permission_block["cards_management"].gc) {
          localStorage.cards_management_block = JSON.stringify(permission_block["cards_management"]);
          cards_management_permission   = 1;
        }

        if(cards_management_permission  ) {
          localStorage.cards_management_permission   = true;
        }

        if(permission_block["sender_management"] && permission_block["sender_management"].gsel) {
          localStorage.sender_management_block = JSON.stringify(permission_block["sender_management"]);
          sender_management_permission   = 1;
        }

        if(contact_setup_permission  ) {
          localStorage.sender_management_permission   = true;
        }


        if(permission_block["signature_management"] && permission_block["signature_management"].gas) {
          localStorage.signature_management_block = JSON.stringify(permission_block["signature_management"]);
          signature_management_permission   = 1;
        }

        if(signature_management_permission  ) {
          localStorage.signature_management_permission   = true;
        }

        if(permission_block["credits_management"] && permission_block["credits_management"].gc) {
          localStorage.credits_management_block = JSON.stringify(permission_block["credits_management"]);
          credits_management_permission   = 1;
        }

        if(credits_management_permission  ) {
          localStorage.credits_management_permission   = true;
        }


        if(permission_block["email_validation_credits_management"] && permission_block["email_validation_credits_management"].gc) {
          localStorage.email_validation_credits_management_block = JSON.stringify(permission_block["email_validation_credits_management"]);
          email_validation_credits_management_permission   = 1;
        }

        if(email_validation_credits_management_permission  ) {
          localStorage.credits_managemail_validation_credits_management_permissionement_permission   = true;
        }


        if(permission_block["message_management"] && permission_block["message_management"].gmmwf) {
          localStorage.message_management_block = JSON.stringify(permission_block["message_management"]);
          message_management_permission   = 1;
        }

        if(message_management_permission  ) {
          localStorage.message_management_permission   = true;
        }

    }
}
