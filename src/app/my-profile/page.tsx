import MembersFetch from '../members/MembersFetch'

const HomeProfile = async() => {
  return (
    <div>
      <h1 className="px-4 font-semibold text-2xl mb-4 text-primaryBlue">Mingle</h1>
      <MembersFetch/>
    </div>
  )
}

export default HomeProfile