import { supabase } from '../database/supabase';
import { userType } from '../@types/@user';

export class UserRepository {
    static async findByEmail(email: string){
        const { data: userByEmail } = await supabase.from('users').select("*").eq('email', email)
        if(userByEmail!.length){
            return true
        } else {
            return false
        }
    }

    static async findUser(username: string){
        const { data: userByUsername } = await supabase.from('users').select("*").eq('username', username).select()
        if(userByUsername){
            return userByUsername[0]
        }
    }

    static async checkIfUserExists(id: string){
        const { data: userByUsername, error } = await supabase.from('users').select("*").eq('id', id).select()
        if(error){
            return false
        }
        
        if(userByUsername!.length === 0){
            return false
        } else {
            return true
        }
    }
    //checkIfUserExist
    static async findByUsername(username: string){
        const { data: userByUsername } = await supabase.from('users').select("*").eq('username', username).select()
        if(userByUsername!.length){
            return true
        } else {
            return false
        }
    }

    static async create(user: userType){
        const { data: newUser, error }= await supabase.from('users').insert(user).select()
        if(error){
            throw new Error
        }
        if(newUser){
            return newUser
        }
    }

    // static async findUser(email: string, username: string){
    //     const { data: userByUsername } = await supabase.from('users').select("*").eq('username', username)
    //     const { data: userByEmail } = await supabase.from('users').select("*").eq('email', email)

    //     //username já foi cadastrado?
    //     if(userByUsername!.length > 0){
    //         return 'username já cadastrado'
    //     }

    //     if(userByEmail!.length > 0){
    //         return 'username já cadastrado'
    //     }

    //     if(userByEmail!.length > 0 || userByUsername!.length > 0){
    //         console.log(true)
    //         return true
    //     } else {
    //         console.log(false)
    //         return false
    //     }
    // }
}