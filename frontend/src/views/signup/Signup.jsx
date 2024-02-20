import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

export default function Signup() {
  const [formModel, setFormModel] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })

  const { loading, signup } = useSignup();

  const handleCheckBoxChange = (gender) => {
    setFormModel({ ...formModel, gender })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formModel)
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered  h-10'
              value={formModel.fullName}
              onChange={(e) => setFormModel({ ...formModel, fullName: e.target.value })}
						/>
          </div>

          <div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='johndoe'
							className='w-full input input-bordered h-10'
              value={formModel.username}
              onChange={(e) => setFormModel({ ...formModel, username: e.target.value })}
						/>
					</div>

          <div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
              value={formModel.password}
              onChange={(e) => setFormModel({ ...formModel, password: e.target.value })}
						/>
					</div>

          <div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
              value={formModel.confirmPassword}
              onChange={(e) => setFormModel({ ...formModel, confirmPassword: e.target.value })}
						/>
					</div>

          <GenderCheckbox onCheckboxChange={handleCheckBoxChange} selectedGender={formModel.gender} />

          <Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
					>
						Already have an account?
					</Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}