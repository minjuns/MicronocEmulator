export let getCustomerList = () => {
    // mimic ajax: will be replaced with actual ajax
    return new Promise( (resolve, reject) => {
        resolve( ["MFP", "MicroNOC"])
    });
};