import { EventEmitter, MathUtils } from "../libs/xviewer";

class TaskManager {
    private _taskCount: number = 0;
    private _taskFinished: number = 0;
    private _resolve: Promise<void> = Promise.resolve();
    private _progress: number = 0;
    private _currentTaskName: string = "";

    public get progress() {
        return this._progress;
    }

    public get currentTaskName() {
        return this._currentTaskName;
    }

    public task(handle: Function | Promise<any>, { name = "", weight = 1 } = {}) {
        this._regist(weight);
        this._currentTaskName = name; // 更新当前任务名称
        return this._resolve
            .then(() => typeof handle === "function" ? handle() : handle)
            .then(() => this._finish(weight, name))
            .catch(err => {
                this._finish(weight, name);
                console.error(err);
            });
    }

    public reset() {
        this._taskCount = 0;
        this._taskFinished = 0;
        this._progress = 0;
        this._currentTaskName = "";
    }

    private _finish(w: number, name: string) {
        this._taskFinished += w;
        this._progress = MathUtils.clamp01(Math.max(this._progress, this._taskFinished / this._taskCount))
    }

    private _regist(w: number) {
        this._taskCount = Math.max(1, this._taskCount + w);
    }
}

class GameManager extends EventEmitter {
    public taskManger: TaskManager = new TaskManager();
    public restartCount: number = 0;

    public reset() {
        this.clear();
        this.taskManger.reset();
        this.taskManger = new TaskManager();
    }

    public get progress() {
        return this.taskManger.progress;
    }

    public get currentTaskName() {
        return this.taskManger.currentTaskName;
    }

    public restart() {
        // 优先使用环境变量配置的 URL,如果没有配置则使用默认值
        const restartUrl = import.meta.env.VITE_RESTART_URL || 'https://ys.mihoyo.com/cloud/#/';
        window.location.href = restartUrl;
    }
    public task(handle: Function | Promise<any>, props = {}) {
        return this.taskManger.task(handle, props);
    }
}

export const gameManager = new GameManager();