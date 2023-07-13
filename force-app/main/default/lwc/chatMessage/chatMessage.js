import { LightningElement, api } from 'lwc';

export default class ChatMessage extends LightningElement {
    @api role;
    @api content;

    style1;
    style2;
    isNotSystemRole;

    connectedCallback() {
        this.style1 = this.inboundOrOutboundStyle1(this.role);
        this.style2 = this.inboundOrOutboundStyle2(this.role);
        this.isNotSystemRole = this.role !== 'system';
    }

    inboundOrOutboundStyle1(role){
		return role === "user" 
        ? "slds-chat-listitem_outbound slds-chat-listitem" 
        : "slds-chat-listitem_inbound slds-chat-listitem";
	};

	inboundOrOutboundStyle2(role){
		return role === "user"
			? "slds-chat-message__text_outbound slds-chat-message__text"
			: "slds-chat-message__text_inbound slds-chat-message__text";
	};
}