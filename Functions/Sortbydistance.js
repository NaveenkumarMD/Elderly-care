function sortbydist(a, b){
    if(a.distance < b.distance){
            return -1;
    }else if(a.distance > b.distance){
            return 1;
    }else{
            return 0;
    }
}
export default sortbydist