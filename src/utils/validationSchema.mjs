export const postSchema={
    username:{
        isLength:{
            options:{
                min:3,
                max:32
            },
            errMsg:"username must be between 3 to 32 char"
        },
        notEmpty:{
            errMsg:"username cant be empty"
        },
        isString:{
            errMsg:"username must be string"
        }
    }
}
export const getSchema={
    filter:{
        isString:{
            errMsg:"filter must be string"
        },
        notEmpty:{
            errMsg:"filter must not be empty"
        },
        isLength:{
            options:{
                min:3,
                max:10
            }
        }
    }
}