require("exports-loader?!./l.min.js")

import Vue from 'vue'

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

import {VueAerisLanguagePlugin} from 'aeris-mixins'
Vue.use(VueAerisLanguagePlugin)

import AerisRedirectionManagement from './aeris-portal/aeris-redirection-management.vue';
import AerisCallForProject from './aeris-portal/aeris-call-for-project.vue';



ljs.addAliases({
	dep: ['https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
		'https://cdnjs.cloudflare.com/ajax/libs/document-register-element/1.4.1/document-register-element.js', 
		'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min.js']
})

ljs.load('dep', function() {
	
	if (!window.registredAerisElements) {
		window.registredAerisElements = [];
	}
	

	function registerElement(name, component) {
        if (!window.registredAerisElements) {
            window.registredAerisElements = [];
        }
        if (window.registredAerisElements.indexOf(name) < 0) {
            Vue.customElement(name, component);
            window.registredAerisElements.push(name)
        }
    }
	
	function aerisPortalRegister() {
		console.info("trying to register actris admin components");
			console.info("Start registration of Actris admin components")
			console.info("Registred elements at this time: "+window.registredAerisElements)
			
			registerElement('aeris-redirection-management', AerisRedirectionManagement);
			registerElement('aeris-call-for-project', AerisCallForProject);	
			
			console.info("Actris admin components registration complete")
	}
	
	
	aerisPortalRegister();
	
	
	
})

