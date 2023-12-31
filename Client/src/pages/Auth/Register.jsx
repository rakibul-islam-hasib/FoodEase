import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthProvider';

const Register = () => {
    const { signUp, updateUser  , user} = useContext(AuthContext)
    const handleSubmit = e => {
        e.preventDefault();
        const fromData = new FormData(e.target);
        const data = Object.fromEntries(fromData);
        signUp(data.email, data.password)
            .then(res => {
                updateUser(data.name)
                    .then(res => { })
                    .catch(err => console.log(err))
            })
            .catch(err => {
                console.log(err);
            })
    }

    if (user) return <Navigate to='/' />
    return (
        <div className='mt-10'>
            <section className="py-26 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="max-w-lg mx-auto">
                        <div className="text-center mb-8">
                            <a className="inline-block mx-auto mb-6" href="#">
                            </a>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Register</h2>
                        </div>
                        <form onSubmit={handleSubmit} action="">
                            <div className="mb-6">
                                <label className="block mb-2 font-extrabold" htmlFor="email">Name</label>
                                <input
                                    className="inline-block 
                                    w-full px-4 py-2 leading-6 text-lg
                                     font-extrabold placeholder-gray-400
                                     placeholder:text-base placeholder:font-normal
                                     outline-none
                                      bg-white shadow border-2 border-blue-500 rounded"
                                    type="text"
                                    name='name'
                                    placeholder="Enter Your Name"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 font-extrabold" htmlFor="email">Email</label>
                                <input
                                    className="inline-block 
                                    w-full px-4 py-2 leading-6 text-lg
                                     font-extrabold placeholder-gray-400
                                     placeholder:text-base placeholder:font-normal
                                     outline-none
                                      bg-white shadow border-2 border-blue-500 rounded"
                                    type="email"
                                    name='email'
                                    id="email"
                                    placeholder="Enter Your Email"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 font-extrabold" htmlFor="password">Password</label>
                                <input
                                    className="inline-block 
                                    w-full px-4 py-2 leading-6 text-lg
                                     font-extra4bold placeholder-gray-400
                                     placeholder:text-base placeholder:font-normal
                                     outline-none
                                      bg-white shadow border-2 border-blue-500 rounded"
                                    type="password"
                                    id="password"
                                    name='password'
                                    placeholder="Enter Your Password"
                                />
                            </div>
                            <button
                                className="inline-block w-full py-3 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-blue-500 hover:bg-blue-600 border-3 border-blue-500 shadow rounded transition duration-200"
                                type="submit"
                            >
                                Sign in
                            </button>
                            <p className="text-center font-extrabold">
                                Already have an account? <Link to={'/login'} className="text-red-500 hover:underline" href="#">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;