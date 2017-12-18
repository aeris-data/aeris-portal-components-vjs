<i18n>
{
  "en": {
  	"descriptionTitle": "Description of the project",
  	"description": "Description",
  	"scientificContext": "Scientific context",
  	"scientificSupport": "Scientific support",
  	"name": "Name",
  	"email": "Email",
  	"descriptionPlaceholder": "Describe in a detailed way, the services, data processing or distribution required  by the project",
  	"scientificSupportPlaceholder": "Indicate national, European or international programs linked with the project.\\nIndicate which support is provided by these programs.",
  	"scientificContextPlaceholder": "Indicate the scientific context of the project",
  	"consideredUse":"Considered use",
  	"responsibles": "Responsibles",
  	"send": "Send",
  	"submissionLimitDate": "Submission limit date",
  	"organisation": "Organisation",
  	"delete": "Delete",
  	"contactInstructions": "If you need some help to fill this form, you can contact us: ",
  	"add":"Add",
  	"noContacts": "No contacts.",
  	"dueDate": "Due date"
  },
  "fr": {
	"descriptionTitle": "Description du projet",
	"description": "Description",
	"scientificContext": "Contexte scientifique",
	"scientificSupport": "Soutien scientifique",
	"name": "Nom",
	"email": "Mél",
	"scientificSupportPlaceholder":"Indiquez les programmes nationaux, européens ou internationaux liés au projet.\\nIndiquez le soutien obtenu de la part de ces programmes.",
	"descriptionPlaceholder": "Décrivez de manière détaillée les services, mise en place ou traitement de données demandées par le projet",
	"scientificContextPlaceholder": "Indiquez le contexte scientifique du projet",
	"consideredUse":"Utilisation envisagée",
	"responsibles": "Responsables",
	"send": "Envoyer",
	"submissionLimitDate": "Date limite de soumission",
	"organisation": "Organisation",
	"delete": "Suppression",
	"contactInstructions": "Si vous avez besoin d'assistance pour remplir votre demande, n'hésitez pas à nous contacter : ",
	"add":"Ajouter",
  	"noContacts": "Aucun contacts.",
  	"dueDate": "Echéance"
  }
}
</i18n>

<template>
<div style="padding: 50px;">
<div class="info-message" v-show="!closed">
<div style="text-align:right"><i class="fa fa-close button" @click="closed=true"></i></div>
<div style="display: flex;justify-content: space-around">
<div v-show="limit">
<i class="fa fa-calendar fa-3x"></i>
{{$t('submissionLimitDate')}}: <b>{{limit}}</b>
</div>
<div>
<i class="fa fa-info-circle fa-3x"></i>
{{$t('contactInstructions')}}: 
	<ul>
		<li> Bernard Legras (Aeris)</li>
		<li> Nicole Papineau (Aeris) </li>
		<li> Jérome Riedi (Aeris/Icare) </li>
		<li> Cathy Boonne (Aeris/Espri) </li>
		<li> Damien Boulanger (Aeris/Sedoo) </li>
	</ul>
</div>
</div>

</div>

<h2>{{$t('descriptionTitle')}}</h2>
<div class="form">

<label for="name" :class="{'error-label': errors.has('name') }">{{$t("name")}} :</label>
<div style="display:grid" >
<input id="name" type="text" v-model="name" v-validate="name" data-vv-rules="required" :class="{'is-error': errors.has('name') }"> </input>
<span class="error-message">{{ errors.first('name') }} </span>
</div>

<label for="description" :class="{'error-label': errors.has('description') }">{{$t("description")}} :</label>
<div style="display:grid" >
<textarea id="description" type="text" :placeHolder="$t('descriptionPlaceholder')" rows="10" v-model="description" v-validate="description" data-vv-rules="required" :class="{'is-error': errors.has('description') }"> </textarea>
<span class="error-message">{{ errors.first('description') }} </span>
</div>

<label for="scientificContext" :class="{'error-label': errors.has('scientificContext') }">{{$t("scientificContext")}} :</label>
<div style="display:grid" >
<textarea id="scientificContext" type="text" :placeHolder="$t('scientificContextPlaceholder')" rows="10" v-model="scientificContext" v-validate="scientificContext" data-vv-rules="required" :class="{'is-error': errors.has('scientificContext') }"> </textarea>
<span class="error-message">{{ errors.first('scientificContext') }} </span>
</div>

<label for="scientificSupport" :class="{'error-label': errors.has('scientificSupport') }">{{$t("scientificSupport")}} :</label>
<div style="display:grid" >
<textarea id="scientificSupport" type="text" :placeHolder="$t('scientificSupportPlaceholder')" rows="10" v-model="scientificSupport" v-validate="scientificSupport" data-vv-rules="required" :class="{'is-error': errors.has('scientificSupport') }"> </textarea>
<span class="error-message">{{ errors.first('scientificSupport') }} </span>
</div>

</div>

<h2>{{$t('responsibles')}}</h2>
<div class="form">
<div></div>
<table width="100%">
<tr>
<th>{{$t('name')}}</th>
<th>{{$t('email')}}</th>
<th>{{$t('organisation')}}</th>
<th></th>
</tr>
<tr v-for="contact in contacts">
<td>{{contact.name}}</td>
<td>{{contact.email}}</td>
<td>{{contact.organisation}}</td>
<td><i class="fa fa-trash button" :title="$t('delete')" @click="destroy(contact)"></i></td>
</tr>
<tr >
<td><input v-model="currentContact.name"></td>
<td><input v-model="currentContact.email"></td>
<td><input v-model="currentContact.organisation"></td>
<td><i class="fa fa-user-plus button" :title="$t('add')" @click="add"></i></td>
</tr>
</table>
</div>

<h2>{{$t('dueDate')}}</h2>


<button @click="send"></button>
</div>
</template>

<script>
import {
	  Validator
	} from 'vee-validate';
	
export default {
	props: {
		lang:  {
			type: String,
			default: 'en'
		},
		
		limit:  {
			type: String,
			default: null
		}
	},
  
	mounted: function() {
		var event = new CustomEvent('aerisThemeRequest', {});
		document.dispatchEvent(event);
		
	},
   
	watch: {
		lang (value) {
			this.$i18n.locale = value
		}
	},
  
	destroyed: function() {
		document.removeEventListener('aerisTheme', this.aerisThemeListener);
		this.aerisThemeListener = null;
	},
  
	created: function () {
		console.log("Aeris portal redirection management - Creating");
		this.$i18n.locale = this.lang;
	    this.aerisThemeListener = this.handleTheme.bind(this);
	    document.addEventListener('aerisTheme', this.aerisThemeListener);
	},
	
	 computed: {
		    hasContacts: function () {
		    	if (!this.contacts) {
		    		return false;
		    	}
		    	if (!this.contacts.length == 0) {
		    		return false;
		    	}
		    	return true;
		    }
		  },
  
	data () {
		return {
			visible: true,
			theme : null,
			aerisThemeListener: null, 
			name: null,
			description: null,
			scientificContext: null,
			scientificSupport: null,
			currentContact: {},
			closed: false,
			contacts: []
			}
	},
  
	methods: {
	
		send: function() {
			
		},
		
		add: function() {
			this.contacts.push(this.currentContact)
			this.currentContact= {}
		},
		
		destroy: function(contact) {
			this.contacts = this.contacts.filter(function(item) { return item != contact})
		},
		
		handleTheme: function(event) {
			this.theme = event.detail
			this.ensureTheme();
	  		
		},
		
		ensureTheme: function() {
		}
		
		      
	} 
	
} 
</script>

<style scoped>

table {
	text-align: left;
	border-collapse: collapse;
}

table tr {
	border-bottom: 1px solid silver
	
}

.button {
	cursor: pointer;
}

table td {
	padding: 5px;
}

input.is-error, textarea.is-error {
    border-color: #a94442;
}

input:focus.is-error {
	outline: #a94442 auto 5px;
}

input:focus, textarea:focus {
	outline: silver auto 5px;
}


.error-label, span.error-message {
	color:  #a94442;
}

span.error-message {
	font-size: 12px;
	padding: 10px;
}

div.form {
	  display: grid;
	  grid-template-columns: 1fr 2fr;
	  grid-gap: 16px;
	}

label {
	  justify-self: end;
	}

input, textarea {
	padding: .375rem .75rem;
	border: 1px solid silver;
	font-size: 16px;
	font-family: Arial;
}

input {
	line-height: 1.5;
}

.info-message {
    color: #31708f;
	background-color: #d9edf7;
	border: 1px solid #bce8f1;;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 4px;
}

 </style>