import React from 'react';

export default function Form(props) {
    const { values, update, submit } = props

    const onChange = evt => {
        const { name, value } = evt.target
        update(name, value)
    }

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <h2>Add a Team Member</h2>
                <button disabled={!values.name || !values.email || !values.role ? true : false}>SUBMIT</button>
            </div>

            <div className='form-group inputs'>
                <h4>General Information</h4>
                
                <label>Name:&nbsp;
                    <input
                        value={values.name}
                        onChange={onChange}
                        name='name'
                        placeholder='type name'
                        maxLength='20'
                        type='text'
                    />
                </label>

                 <label>Email:&nbsp;
                    <input
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        placeholder='type email'
                        maxLength='40'
                        type='email'
                    />
                </label>

                <label>Role:&nbsp;
                        <select onChange={onChange} value={values.role} name='role'>
                            <option value=''>-- Select a Role</option>
                            <option value='Frontend'>Frontend</option>
                            <option value='Backend'>Backend</option>
                            <option value='UI/UX'>UI/UX</option>
                        </select>
                </label>
            </div>
        </form>
    )

}