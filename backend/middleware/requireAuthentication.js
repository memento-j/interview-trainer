export function requireAuthentication(req, res, next) { 
    //get the user id from either params or the body   
    let { id } = req.params;
    
    //if there is no valid id, return error
    if (!id) {
        return res.status(400).json({ error: "Missing ID in request" });
    }
    //compare with the authorized user making the request
    if  (req.user.id !== id) {
        return res.status(403).json({ error: "Forbidden, not authenticated" });
    }
    next();
}