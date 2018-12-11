export default class Utils {

    static convertToArr( obj ) {
        let arr = [];

        for (let key in obj) {
            if ( key !== 'blank' ) {
                obj[ key ].id = key;
                arr.push( obj[ key ] );
            }
        }	

        return arr;
    }
}