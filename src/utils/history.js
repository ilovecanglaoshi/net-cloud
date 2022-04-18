const History = {
    _history: [], // 历史记录堆栈
    install(Vue) {
        // 提供Vue插件所需安装方法
        Object.defineProperty(Vue.prototype, '$routerHistory', {
            get() {
                return History;
            }
        })
    },
    push(path) { // 入栈
        this._history.push(path);
    },
    pop() {
        this._history.pop();
    },
    canBack(path){
        // console.log(this._history, 'this._history');
        const idx = this._history.indexOf(path)
        if(idx != -1) {
            return idx != 0 || this._history.indexOf(path, 2) != -1
        }
        return false
    },
    canForward(path) {
        // console.log(this._history, 'this._history');
        if(this._history.length == 1) return false
        if(this._history[this._history.length - 1] == path) return false
        return true
    }

}
export default History;