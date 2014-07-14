//auto-initialization
//Create embedded viewer from HTML attributes if true

$(document).ready(function() {

    if ($("#webmoljs_viewer")[0] !== undefined)
        WebMol.autoinit = true;
        
    if (WebMol.autoinit) { 
  
        var viewerdiv = WebMol.viewerdiv = $("#webmoljs_viewer");
        
        var datauri = null;
        
        if (viewerdiv.data("pdb"))
            datauri = "http://www.pdb.org/pdb/files/" + viewerdiv.data("pdb") + ".pdb";
        else if (viewerdiv.data("href"))
            datauri = viewerdiv.data("href");
            
        var bgcolor = Number(viewerdiv.data("backgroundcolor")) || 0x000000;
        var style = viewerdiv.data("style") || {line:{}};
        
        WebMol.glviewer = WebMol.createViewer("webmoljs_viewer", {defaultcolors: WebMol.rasmolElementColors, callback: function(viewer) {            
            viewer.setBackgroundColor(bgcolor);            
        }});
        
        if (datauri) {  
            
            var type = viewerdiv.data("datatype") || "pdb";
             
            $.get(datauri, function(ret) {
                WebMol.glviewer.addModel(ret, type);
                WebMol.glviewer.setStyle({}, style);
                WebMol.glviewer.zoomTo();
                WebMol.glviewer.render();                                           
            }, 'text');
       
        }
               
    }
});
    