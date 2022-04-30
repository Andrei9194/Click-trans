import './index.css'
export const SuccessModal =({showModal})=>{

    return(
        <div>
            <div className={showModal ? 'hidden' : 'success-container'}>
            <div className='success-info'>
                <h1 className="success-title">Success</h1>
                <p className="success-text">We received your datas</p>
            </div>
        </div>
        </div>

    )
}