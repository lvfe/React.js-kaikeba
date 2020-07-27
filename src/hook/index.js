//hook 16.8因为
// they let you use state and pther react features(effect, cache) without writing a class
//好处：组件间状态逻辑复用（class, 高阶组件， provider, consumer）， 不用改变组件装填。
//自定义hook是个函数
//好处：以前会在一个生命周期写复杂，现在使用useEffect, 颗粒度小， uselayouteffect。状态useRef, useReducer
//函数组件， 好实现 预编译友好；没有bind(this
//api) usestate useContext, useMemo, useCallback, useRef, useImperativeHandl额（结合forwardRef), useForm,useReducer（可以处理复杂的）, usestate(可以处理简单的), useEffect(不紧急)， useLayout(紧急)
