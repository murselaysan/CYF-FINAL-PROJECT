import { useState } from 'react';
import { Link,Route } from 'react-router-dom';
import useFetch from '../../../Auth/useFetch';
import Spinner from '../../UI/Spinner';
import './MentorRegions.scss';
import WestMidland from '../../../Assets/images/westmidlands.jpg';
import London  from '../../../Assets/images/london.jpg';
import NorthWest from '../../../Assets/images/NorthWest.jpg';
import Scotland from '../../../Assets/images/scothland.jpg';
import Rome from '../../../Assets/images/Rome.jpg';
import CapeTown from '../../../Assets/images/CapeTown.png';
import fallbackImage from '../.../../../../Assets/images/inprogress.png';
import StudentList from '../../../Pages/MentorPages/MentorClassStudentList/StudentList';
import WestMidlandClasses from '../Classes/WestMidlands Classes/WestMidlandClasses';

const MentorRegions = () => {
  let { status, data, error } = useFetch('http://localhost:3001/api/region');

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  } else if (status === 'success') {
    return <RegionList data={data} />;
  } else {
    return <Spinner />;
  }
};

const RegionList = ({ data }) => {
  const [regions, setRegions] = useState(data);

 

  return (
    <div>
    <h2> Please Select A Region </h2>
      <div className="row">
       
         { regions.map(({ name }) => (
            <div className="col-12 col-md-6 col-xl-4 rounded " key={name}>
              <div className="text-center image-container">
                <Link to={`/regions/classes/${name}`}>
            
                  <img
                    src={
                      name === 'West Midlands'
                        ? WestMidland
                        : name === 'London'
                        ? London
                        : name === 'Roma'
                        ? Rome
                        : name === 'Scotland'
                        ? Scotland
                        :name === 'North West'
                        ? NorthWest
                        :name === 'Cape Town'
                        ? CapeTown
                        :fallbackImage
                    }
                    className="rounded mx-auto class-image"
                    alt={name}
                  />
                  <h2 className="region">{name}</h2>
                </Link>
              </div>
             
            </div>
          ))
        }
      </div>
          <div>
            <Route path={`/regions/classes/West Midlands`} component={WestMidlandClasses} />
            <Route path={`/regions/classes/Cape Town`} component={StudentList} />
            <Route path={`/regions/classes/London`} component={StudentList} />
          </div>
    </div>
  );
};

export default MentorRegions;