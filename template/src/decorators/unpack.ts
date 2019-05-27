/**
 * @file api的通用解包装饰器
 * @author wty
 */

export default function<T = any> (): MethodDecorator {
    return function (target, key, descriptor) {
        let fn = descriptor.value;

        if (typeof fn !== 'function') {
            throw new Error();
        }

        return {
            configurable: true,
            get() {
                // @ts-ignore
                if (this === target.prototype || this.hasOwnProperty(key) || typeof fn !== 'function') {
                    return fn;
                }

                const boundFn = fn.bind(this);
                const newFn = function (...args): Promise<T> {
                    return boundFn(...args)
                        .then(res => {
                            const body = res.body;
                            const {errorCode, errorMsg} = body;

                            if (errorCode) {
                                const err = new Error(errorMsg);
                                (err as any).bizErr = true;
                                (err as any).errorCode = errorCode;
                                throw (err);
                            }

                            return body.result;
                        })
                        .catch(e => {
                            if (e.bizErr) {
                                throw e;
                            }

                            throw new Error('网络错误');
                        });
                }.bind(this);

                Object.defineProperty(this, key, {
                    configurable: true,
                    get() {
                        return newFn;
                    },
                    set(value) {
                        fn = value;
                        delete this[key];
                    }
                });

                return newFn;
            },
            set(value) {
                fn = value;
            }
        };
    };
}
