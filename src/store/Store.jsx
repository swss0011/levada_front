import { makeAutoObservable} from 'mobx'

class Category{
    id = null;
    name = "";
    loaded = false;

    constructor(_id, _name) {
        // Call it here
        makeAutoObservable(this)
        this.id = _id
        this.name = _name
    }

    setLoaded(val){
        this.loaded = val
    }

}

class Store {

    categories = []

    likesCount = 12

    didMount = 0

    newCommentCount = 0

    showLogin = false
    showMain = true
    showSingup = false

    token = ""
    isVerified = false
    isAdmin = false

    isLoading = false

    lastUpdate = ""

    comments = ["Wow", "awesome", "awesome", "awesome", "awesome", "awesome", "awesome", "awesome", "awesome", "awesome", "awesome", "awesome", "awesome", "awesome", "awesome"]

    constructor() {
        // Call it here
        makeAutoObservable(this)
    }

    addCategories(objs){
        this.categories = []
        for(const item of objs){
            this.categories.push(new Category(item.key, item.name))
        }
        
    }

    categoriesProductsLoaded(name){
        for(const item of this.categories){
            if(item.name === name){
                item.setLoaded(true)
                break
            }
        }
    }

    isProductsLoaded(name){
        var res = false
        for(const item of this.categories){
            if(item.name === name){
                res = item.loaded
                break
            }
        }
        return res
    }

    setLastUpdate(update){
        this.lastUpdate = update
    }

    isUpTodate(current){
        return current === this.lastUpdate
    }

    setAdmin(newToken){
        this.token = newToken
        this.isAdmin = true
    }

    setUser(newToken){
        this.token = newToken
        this.isAdmin = false
    }

    setVerified(verf){
        this.isVerified = verf
    }

    updateCount() {
        this.likesCount++;
    }

    postComment(comment) {
        this.comments.push(comment)
    }

    postCommentOnTop(comment){
        this.newCommentCount++;
        this.comments.unshift(`${comment}${this.newCommentCount}`)
    }

    openLogin(){
        this.showLogin = true
        this.showMain = false
        this.showSingup = false
    }

    flipSingUpLogin(){
        var t = this.showLogin
        this.showLogin = this.showSingup
        this.showSingup = t

        this.showMain = false    
    }

    closeLogin(){
        this.showLogin = false
        this.showMain = true
        this.showSingup = false
    }

    setDidMount(){
        this.didMount += 1
    }

    setLoading(load){
        this.isLoading = load
    }

    get commentsCount(){
        return this.comments.length;
    }

}


const storeInstance = new Store()

export default storeInstance;