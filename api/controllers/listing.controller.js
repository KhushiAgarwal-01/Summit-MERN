import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";




export const createListing=async (req,res,next)=>{
try{
    const listings=await Listing.create(req.body);
    return res.status(201).json(listings);
    }
catch(error)
    {
        next(error);
  }
}

export const deleteListing=async(req,res,next)=>{

    const listing =await Listing.findById(req.params.id);
    if(!listing) return( next(errorHandler(401,'Listing not found')));

    if(req.user.id !== listing.userRef){
        return (next(errorHandler(401,'oops! listing owener does not allow ')))
    }
    try{
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json('listing deleted successfully')

    }catch(error){
        next(error);
    }

}

export const updateListing= async(req,res,next)=>{

    const listing = await Listing.findById(req.params.id);
    if(!listing) return (next(errorHandler(401,'Listing not found')));

    if(listing.userRef!=req.user.id){
        return (next(errorHandler(401,'Oops!, listing owner does not want to update')));

    }
    try{
        const updatedListing=await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json('updated listing')
    }catch(error){
        next(error);
    }


}

export const getListing=async(req,res,next)=>{

    try{
        const listing=await Listing.findById(req.params.id);
        if(!listing) return (next(errorHandler(401,'Listing not found')));

        res.status(200).json(listing);

    }catch(error){
        next(error);
    }
}