var analyticsCNIL = {

    //mode : normal, minimal, dontCare
    mode: "normal",
    //Utilise ou non l'option DNT du navigateur.
    enableDNTBrowserOption: false,
    //message pour l'utilisateur
    messageContent: "En poursuivant votre navigation sur ce site, vous acceptez l’utilisation de cookies pour réaliser des statistiques de visites anonyme.",
    //URL en savoir plus
    urlLearnMore: "http://www.google.com/intl/fr/policies/technologies/cookies/",
    //Clé Google Analytics
    gaKey: "UA-XXXXXX-Y",

    /**
     * Vérifie si le cookie est défini.
     *     Si indéfini : affiche la div et bind les boutons
     *     Si l'utilisateur a consenti track
     */
    start: function () {
        if (this.mode === "dontCare") {
            this.track();
            if (Cookies.get('cookieBanner') === undefined) {
                this.showBanner();
            }
        } else if (Cookies.get('cookieConsent') && Cookies.get('cookieConsent') === '1') {
            this.track();
        }
        else if (Cookies.get('cookieConsent') === undefined && this.doNotTrack() !== true) {
            this.showBanner();
        }
    },

    /**
     * Vérifie si l'option doNotTrack du navigateur est activée
     */
    doNotTrack: function () {
        if (this.enableDNTBrowserOption ===  false) {
            return false;
        }
        if ((navigator.doNotTrack && (navigator.doNotTrack === 'yes' || navigator.doNotTrack ===' 1')) || ( navigator.msDoNotTrack && navigator.msDoNotTrack === '1') ) {
            return true;
        } else {
            return false;
        }
    },

    //Affiche la bannière et bind les évènements liés
    showBanner: function() {
        var that = this;
        var html = [];

        html.push(
            '<div class="cookie" id="cookie">',
                this.messageContent, ' ',
                '<a href="',
                this.urlLearnMore,
                '" target="_blank">En savoir plus.</a>');

        if (that.mode === "normal") {
            html.push(
                '<div class="cookie_btn" id="cookie_accept">Ok</div>',
                '<div class="cookie_btn cookie_btn-refuse" id="cookie_refuse">Refuser les cookies</div>');
        } else if (that.mode === "minimal") {
            html.push(
                '<div class="cookie_btn" id="cookie_accept">Ok</div>');
        } else if (that.mode === "dontCare") {
            html.push(
                '<div class="cookie_btn" id="cookie_close">x Fermer</div>');
        } else {
            console.warn("[analyticsCNIL] Le mode n'est pas bien défini.");
        }

        html.push(
            '</div>');

        $('body').append(html.join(""));

        $( "#cookie_accept" ).on("click", function(e) {
            e.preventDefault(e);
            that.accept();
            $('#cookie').fadeOut(300,function(){
                $('#cookie-bar').remove();
            });
        });
        $( "#cookie_refuse" ).on("click", function(e) {
            e.preventDefault(e);
            that.refuse();
            $('#cookie').fadeOut(300,function(){
                $('#cookie-bar').remove();
            });
        });
        $( "#cookie_close" ).on("click", function(e) {
            e.preventDefault(e);
            Cookies.set('cookieBanner', '1', {expires: 30 * 13});
            $('#cookie').fadeOut(300,function(){
                $('#cookie-bar').remove();
            });
        });

    },

    accept: function() {
        Cookies.set('cookieConsent', '1', {expires: 30 * 13});
        this.track();
    },

    refuse: function() {
        Cookies.set('cookieConsent', '0', {expires: 30 * 13});
        this.deleteAnalyticsCookies();
    },

    reset: function() {
        Cookies.remove('cookieConsent', { path: '' });
        this.deleteAnalyticsCookies();
        window.location.reload();
    },

    //charge la balise script de Google Analytics
    callGoogleAnalytics: function() {
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', this.gaKey]);
        _gaq.push(['_trackPageview']);

        //renvoie la variable dans la page
        window._gaq = _gaq;

        (function() {
            var ga = document.createElement('script');
            ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
        })();
    },


    //Active le tracking (execution du code JS Google Analytics)
    track: function () {
        this.callGoogleAnalytics();
    },

    //Supprime les cookies de Google Analytics
    deleteAnalyticsCookies: function () {
        var cookieNames = ["__utma","__utmb","__utmc","__utmt","__utmv","__utmz","_ga","_gat"];
        for (var i=0; i<cookieNames.length; i++) {
            Cookies.remove(cookieNames[i], { path: '' });
        }
    }

};

document.addEventListener('DOMContentLoaded', function() {
    analyticsCNIL.start();
});
