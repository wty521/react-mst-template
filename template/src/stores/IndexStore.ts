
import {types, flow} from 'mobx-state-tree';


export default types
    .model(
        'IndexStore',
        {
            // banner文本
            text: types.optional(types.string, '')
        }
    )
    .views(self => ({

    }))
    .actions(self => ({
        init(): void {
            self.text = 'index页';
        }
    }))
    // life cycle
    .actions(self => ({
        afterCreate() {
            self.init();
        }
    }));
