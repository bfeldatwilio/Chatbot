import { LightningElement } from 'lwc';
import getAIMessage from '@salesforce/apex/AIController.getAIMessage';

export default class Chatbot extends LightningElement {
    loading = false;
    currentQuestion = "";
    systemPrompt = "You are a 1940's sailor who is rude and swears a lot";
    updatedPrompt;
    
    fullConversation = [];

    emptyInput = true;
    promptVisible = false;
    
    connectedCallback() {
        this.addMessage(this.systemPrompt, 'system');
    }

    inputChangeHandler(e) {
        this.currentQuestion = e.target.value;
        this.emptyInput = e.target.value.length === 0;
    }

    promptChangeHandler(e) {
        this.updatedPrompt = e.target.value;
    }
    
    savePrompt() {
        this.fullConversation[0].content = this.updatedPrompt;  
        this.systemPrompt = this.updatedPrompt;      
        this.hidePromptEditor();
    }
    
    random() {
        return "id" + Math.random().toString(16).slice(2);
    }
    
    addMessageHandler(e) {
        e.preventDefault();
        this.loading = true;
        this.addMessage(this.currentQuestion, 'user');
        let jsonString = JSON.stringify({
            messages: this.fullConversation
        });
        getAIMessage({payload:jsonString}).then(response => {
            let jsonResponse = JSON.parse(response);
            this.addMessage(jsonResponse.data.content, 'assistant');
        }).catch (error => {
            console.log(error)
        }).finally(() => {
            this.currentQuestion="";
            this.loading = false;
        })
    }
    
    addMessage(content, role) {
        let currentIndex = this.fullConversation.length;
        let newMessage = {
            index: currentIndex +=1,
            role: role,
            content: content
        }
        this.fullConversation = [...this.fullConversation, newMessage];
        this.scrollToBottom();
    }

    scrollToBottom() {
        let listBottom = this.template.querySelector('.list-bottom');
        if(listBottom) {
            setTimeout(() => {
                listBottom.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
            }, 0);
        }
	};

    showPromptEditor() {
        this.promptVisible = true;
        setTimeout(() => {
            let modalDialog = this.template.querySelector(".slds-modal");
            let modalBackdrop = this.template.querySelector(".slds-backdrop");
            modalDialog.classList.add("slds-fade-in-open");
            modalBackdrop.classList.add("slds-backdrop_open");
          }, 0);
    }

    hidePromptEditor() {
        this.promptVisible = false;
    }
}