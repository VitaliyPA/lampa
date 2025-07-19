(function () {
    'use strict';

    //return;
	
    if (window.location.protocol == 'http:') {
		//localStorage.setItem( 'cub_domain', "cub.freebie.tom.ru" );
		//localStorage.setItem( 'cub_mirrors', '["cub.freebie.tom.ru", "cub.rip"]' );
    } else {
		//localStorage.setItem( 'cub_domain', "cub.red" );
		//localStorage.setItem( 'cub_mirrors', '["cub.red", "cub.red"]' );
    }

    var enableProxyApi = Lampa.Storage.field('proxy_tmdb_auto'), enableProxyImage = Lampa.Storage.field('proxy_tmdb_auto');
    if (!enableProxyApi) return;

    var tmdb = {
        name: 'TMDB My Proxy',
        version: '5.5.5',
        description: 'Проксирование постеров и API сайта TMDB',
        path_image: Lampa.Utils.protocol() + 'tmdbproxy.freebie.tom.ru/image.tmdb.org/',
        path_api: Lampa.Utils.protocol() + 'tmdbproxy.freebie.tom.ru/api.themoviedb.org/3/'
    };

    Lampa.TMDB.image = function (url) {
        var base = Lampa.Utils.protocol() + 'image.tmdb.org/' + url;
        //return (enableProxyImage && Lampa.Storage.field('proxy_tmdb')) ? tmdb.path_image + url : base;
        return enableProxyImage ? tmdb.path_image + url : base;
    };

    Lampa.TMDB.api = function (url) {
        var base = Lampa.Utils.protocol() + 'api.themoviedb.org/3/' + url;
        //return (enableProxyApi && Lampa.Storage.field('proxy_tmdb')) ? tmdb.path_api + url : base;
        return enableProxyApi ? tmdb.path_api + url : base;
    };

    var checkApiUrl = Lampa.Utils.protocol() + 'api.themoviedb.org/3/authentication?api_key=' + Lampa.TMDB.key();
    var network = new Lampa.Reguest();
    network.silent(
        checkApiUrl,
        function(data){
            if (!!data && data.success === true) {
                enableProxyApi = enableProxyImage = false;
                console.log('App', 'TMDB proxy (from freebie) is disabled');
                checkApiUrl = network = null;
            }
        },
        function () {
            enableProxyApi = enableProxyImage = true;
            console.log('App', 'TMDB proxy (from freebie) is enabled');
            checkApiUrl = network = null;
        }
    );

})();
