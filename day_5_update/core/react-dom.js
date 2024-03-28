/**
 * @author zhui 906613279@qq.com
 * @description 模拟实现react-dom
 * @date 2024年3月23日14:26:02
 */
import react from './React.js'
export const createRoot =(container)=>{

    return {

        render:(element)=>{
            react.render(element,container)
        }
    }
}
