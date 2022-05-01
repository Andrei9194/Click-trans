import { useEffect, useState } from 'react'
import { SuccessModal } from '../successModal'
import './index.css'
export const Form = () =>{
    const URL = 'https://jsonplaceholder.typicode.com/posts'

    const regs = /([a-z]|[A-Z]|[?/:;'"|\!@#$%^&*)(~\{\[\]\}`=+_\-<>])/g
    const [showForm, setShowForm] = useState(true)
    const [click, setClick] = useState(true)
    const [bruttoValue, setBruttoValue] = useState('')

    const [formData, setFormData] = useState({
        description: '',
        priceNetto: '',
        vat: '',
        confirms: '',
    })

    const {description, priceNetto, vat, confirms} = formData

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        setBruttoValue((priceNetto * vat)/100 + Number(priceNetto))

    }, [priceNetto, vat])

    function sendRequest (method, url,  body=null){
  
    return new Promise((resolve, reject,)=>{
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)
    
      xhr.responseType = 'json'
      xhr.setRequestHeader('Content-type', 'application/json')
    
      xhr.onload = () =>{
        if(xhr.status >= 400){
          reject(xhr.response)
        } else{
          resolve(xhr.response)
        }
      }
      xhr.onerror = () =>{
        console.log(xhr.response)
      }
      xhr.send(body)
      })
    }

    const handleSubmit=(e) =>{
        e.preventDefault()
        if(!description.length || !priceNetto.length || !vat.length || !confirms.length || priceNetto.match(regs) || 255 < description.length){
            setClick(false)
        } else{
            sendRequest('POST', URL, JSON.stringify({...formData, id: Date.now()}) )
            .then(data =>{
                setClick(true)
                setFormData({
                    description: '',
                    priceNetto: '',
                    vat: '',
                    confirms: ''
            })
            setShowForm(!showForm)
            })
            .catch(err =>console.log(err)) 
        }
    }
    return(
        <div>
            <div className={!showForm ? 'hidden' : ''}>
            <h3 className='title'>Counter</h3>
            <form>
                <div className='form-content'>
                    <div className='form-areas'>
                        <label className='form-label' htmlFor='description'>Description</label>
                        <textarea name="description" id="description"
                        onChange={handleChange}
                         className="form-input field-textarea" value={description}></textarea>
                        <p style={{marginTop: 0, textAlign: 'end'}}>{255 - description.length}/255</p>
                        <p className={(!description.length && !click) ? 'required' : 'hidden'}>Text required</p>
                        <p className={ 255 < description.length  ? 'required' : 'hidden'}>You can't add more than 255 characters</p>
                    </div>
                    <div className='form-areas'>
                        <label className='form-label'>Send confirmation</label>
                        <div className='form-input_radioArea'>
                            <div className='form-input_radio'>
                                <label htmlFor='confirm-yes'>Yes</label>
                                <input type='radio' id='confirm-yes' name='confirms'  onChange={handleChange} value='yes'
                                checked={confirms === 'yes'}
                                />  
                            </div>
                            <div className='form-input_radio'>
                                <label htmlFor='confim-no'>No</label>
                                <input type='radio' id='confirm-no' name='confirms' 
                                onChange={handleChange} value='no' 
                                checked={confirms === 'no'}
                                />
                            </div>
                        </div>
                        <p className={(!confirms.length && !click) ? 'required' : 'hidden'}>Text required</p>
                    </div>
                    <div className='form-areas'>
                        <label className='form-label' htmlFor='vat'>VAT</label>
                            <select name="vat" id='vat' className="field-select"
                                onChange={handleChange}
                                value={vat}
                            >
                                <option label='Choose vat'/>
                                <option value="19">19%</option>
                                <option value="21">21%</option>
                                <option value="23">23%</option>
                                <option value="25">25%</option>
                            </select>
                            <p className={(!vat.length && !click) ? 'required' : 'hidden'}>Text required</p>
                    </div>
                    <div className='form-areas'>
                        <label className='form-label' htmlFor='priceNetto'>Price netto EUR</label>
                        <input type="text" name="priceNetto" id='priceNetto' className="form-input"
                        onChange={handleChange}
                        value={priceNetto}
                        disabled={!vat.length}
                        />
                        <p className={(!priceNetto && vat) ? 'required' : 'hidden'}>Field required</p>
                        <p className={priceNetto.match(regs) ? 'required' : 'hidden'}>Please, input number</p>
                    </div>
                    <div className='form-areas'>
                        <label className='form-label' htmlFor='priceBrutto'>Price brutto EUR</label>
                        <input type="text" name="priceBrutto" id='priceBrutto' className="form-input" value={bruttoValue} readOnly={true}/>
                    </div>
                    <div className='form-areas'>
                        <input type="submit" value="Submit" onClick={handleSubmit}/>
                    </div>
                </div>
            </form>
        </div>
         <SuccessModal showModal={showForm}/>
        </div>
    )
}
