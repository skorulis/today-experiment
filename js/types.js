var Day = Parse.Object.extend("Day", {
    dateYesterday: function() {
        var date = this.get("date")
        return new Date(
            date.getFullYear(), 
            date.getMonth(), 
            date.getDate() - 1,
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        );
    },
    formattedDate: function() {
        return this.get("date").toDateString()   
    }
    
},
                              
{
    dateToday: function() {
        
        return this.truncateDate(new Date());
    },
    truncateDate: function(date) {
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        return date
    }
    
});
 