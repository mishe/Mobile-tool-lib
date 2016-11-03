module.exports = function parseUrl (url) {
    if(window.URL){
        return new window.URL(url);
    }
    var a = document.createElement('a');
    a.href = url;
    return {
        hash: a.hash,
        host: a.host,
        hostname: a.hostname,
        href:url,
        origin:a.origin,
        password:a.password,
        pathname:a.pathname,
        port: a.port,
        protocol: a.protocol,
        search: a.search,
        searchParams:{
            get:function(key){
                var reg = new RegExp(key +"=([^#&]*)",'i');
                var r = a.search.match(reg);
                if (r!=null) return unescape(r[1]); return null;
            }
        }
    };
}
