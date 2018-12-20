module.exports = {
   displayAlert:async (res,title,message,type,url) => {
        res.render('Alert', { title: title, content: message, type: type, url: url });
   }
}
