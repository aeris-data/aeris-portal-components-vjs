<i18n>
{
  "en": {
  	"redirections": "Redirections"
  },
  "fr": {
	"redirections": "Redirections"
  }
}
</i18n>

<template>
<div>
<aeris-notifier></aeris-notifier>
<h3>{{$t("redirections")}}</h3>
<div v-for="redirection in redirections">
URL : {{redirection.url}}
Suffixe: {{redirection.aerisSuffix}}
</div>

</div>
</template>

<script>
export default {
	props: {
		lang:  {
			type: String,
			default: 'en'
		}
	},
  
	mounted: function() {
		var event = new CustomEvent('aerisThemeRequest', {});
		document.dispatchEvent(event);
		
		var url = "https://sedoo.aeris-data.fr/aeris-rest-services/rest/redirection/list"
        this.loadingsites = true;
        this.$http.get(url).then((response) => {
          this.redirectionLoadingSuccess(response)
        }, (response) => {
          this.redirectionLoadingError(response)
        });
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
  
	data () {
		return {
			visible: true,
			theme : null,
			aerisThemeListener: null,
			redirections: null
			}
	},
  
	methods: {
		
		save: function() {
			var configUrl = this.configUrl+this.selectedProduct.id
			this.$http.post(configUrl, this.config).then((response) => {
		          this.configSavingSuccess(response)
	        }, (response) => {
	          this.configSavingError(response)
	        });
			
			
		},
		
		 remove: function(responsible) {
			 this.config.responsibles = this.config.responsibles.filter(function(item) {return item != responsible})
		 },
		 
		 redirectionLoadingSuccess: function(response) {
			 this.loadingsites = false;
		      var redirections = JSON.parse(response.bodyText)
		      this.redirections = redirections
		 },
		 
		 configSavingSuccess: function(response) {
			 document.dispatchEvent(new CustomEvent('aerisNotificationMessageEvent', { 'detail': {message: this.$i18n.t('saveOk')}}))
		 },
		 
		 configSavingError: function(response) {
			 document.dispatchEvent(new CustomEvent('aerisErrorNotificationMessageEvent', { 'detail': {message: this.$i18n.t('saveKo')}}))
		 },
		 
		 
		
		handleTheme: function(event) {
			this.theme = event.detail
			this.ensureTheme();
	  		
		},
		
		ensureTheme: function() {
		}
		
		      
	} // methods
	
} // default
</script>

<style>

 </style>