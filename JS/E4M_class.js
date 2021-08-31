class IconSet {
    /**
     * @param {Element} nest 
     * @param {Array} whole_set 
     * @param {Array} init_set 
     * @param {String} init_set
     * @param {Boolean} dynamic 
     *
     * builds a set of n div (n<100), each containing the string of whole_set[0] ... whole_set[n-1]
     * if div kth div contains a string listed in [init_set], then div has class E4M_on. Otherwize, class E4M_off
     * divs have id prefix_id01, prefix_id02, prefix_idnn, 
     * if init_set is ["*"] then all divs have class "E4M_on"
     * if dynamic is true, clicking the div calls Toggle_on_off_class, which must be provided elswhere
     * Status returns the string to be stored in the database for updated set ("*" if all ON or all OFF).
     * 
     * required from external :
     * - css definition for E4M_on and E4M_off classes
     * - Toggle_on_off_class function
     * 
     */
    constructor(nest, whole_set, init_set, prefix_id, dynamic){
        this.nest = nest;
        this.whole_set = whole_set;
        this.actual_set = init_set;
        this.prefix_id = prefix_id;
        this.dynamic = dynamic;
        this.Build();
    }
    Status(){
        let coll = document.getElementById(this.nest).children;
        let status_str='';
        let all_on = true;
        let all_off = true;
        for ( let i = 0; i < coll.length ; i++ ) {
            if (coll[i].classList.contains("E4M_on")) {
                status_str += "'" + this.whole_set[i] +"', ";
                all_off &&= false;
            } else {
                all_on &&= false;
            }
        }
        status_str = status_str.substring(0, status_str.length-2);
        if (all_on || all_off){
            status_str = '"*"';
        }
        return status_str;
    }
    Build() {
        let     nesting_div = document.getElementById(this.nest);
        for ( let i = 0; i < this.whole_set.length ; i++ ) {
            let newdiv = document.createElement('div');
            newdiv.innerHTML = this.whole_set[i];
            if (this.actual_set.includes(this.whole_set[i]) || this.actual_set[0] == "*") {
                newdiv.classList.add("E4M_on");
            } else {
                newdiv.classList.add("E4M_off");
            };
            newdiv.id = this.prefix_id + i.toString(10).padStart(2,'0');
            if (this.dynamic) {
                newdiv.addEventListener('click', Toggle_on_off_class);
            };
            nesting_div.appendChild(newdiv);
        }
    }
    Refresh (newset) {
        this.actual_set = newset;
        document.getElementById(this.nest).innerHTML="";
        this.Build();
    }   
}