export const GlobalMixin = {
    methods: {
        deepCopy: function(payload){
            const data = JSON.stringify(payload);
            return JSON.parse(data);
        }
    }
}