const localstrategy=require('passport-local').Strategy;

const bcrypt=require('bcrypt');

function initialize(passport,getUserByEmail,getUserById){
    const authenticateUser = async (email,password,done)=>{
        
        const user=await getUserByEmail(email);
        if(user==null)
        {
            return done(null,false,{message:"No User with that Email"});
        }
        
        try{
            if(await bcrypt.compare(password,user.hashpass))
        {
            return done(null,user);    
        }
        else
            return done(null,false,{message:"Password Incorrect"});
        }
        catch(e)
        {
            return done(e);
        }
    }
passport.use(new localstrategy({usernameField:"email"},authenticateUser));
passport.serializeUser((user,done)=>done(null,user.id));
passport.deserializeUser(async (id,done)=>done(null,await getUserById(id)));
}

module.exports=initialize;