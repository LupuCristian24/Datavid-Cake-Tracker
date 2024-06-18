import { useState, useEffect } from 'react';
import axios from 'axios';
import './ListBirthdays.css';

const ListBirthdays = () => {
  const [members, setMembers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await axios.get('http://localhost:3001/api/members');
      setMembers(response.data);
    };
    fetchMembers();
  }, []);

  const removeMember = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/members/${id}`);
      setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
    } catch (error) {
      console.error('Failed to remove member:', error);
    }
  };

  const sortMembers = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedMembers = [...members].sort((a, b) => {
      if (key === 'birth_date') {
        const dateA = new Date(a.birth_date);
        const dateB = new Date(b.birth_date);
        const nextBirthdayA = getNextBirthday(dateA);
        const nextBirthdayB = getNextBirthday(dateB);

        return direction === 'ascending' ? nextBirthdayA.getTime() - nextBirthdayB.getTime() : nextBirthdayB.getTime() - nextBirthdayA.getTime();
      } else {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      }
    });

    setMembers(sortedMembers);
  };

  const getNextBirthday = (birthDate) => {
    const today = new Date();
    const birthDateThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (birthDateThisYear < today) {
      birthDateThisYear.setFullYear(today.getFullYear() + 1);
    }
    return birthDateThisYear;
  };

  const getClassNamesFor = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? 'sorted-asc' : 'sorted-desc';
    }
    return '';
  };

  return (
    <div className="container">
      <h2 className="title">List of Birthdays</h2>
      <div className="table-container">
        <table className="members-table">
          <thead>
            <tr>
              <th className={getClassNamesFor('id')} onClick={() => sortMembers('id')}>No</th>
              <th className={getClassNamesFor('first_name')} onClick={() => sortMembers('first_name')}>First Name</th>
              <th className={getClassNamesFor('last_name')} onClick={() => sortMembers('last_name')}>Last Name</th>
              <th className={getClassNamesFor('birth_date')} onClick={() => sortMembers('birth_date')}>Birth Date</th>
              <th className={getClassNamesFor('country')} onClick={() => sortMembers('country')}>Country</th>
              <th className={getClassNamesFor('city')} onClick={() => sortMembers('city')}>City</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member.id}>
                <td>{index + 1}</td>
                <td>{member.first_name}</td>
                <td>{member.last_name}</td>
                <td>{member.birth_date}</td>
                <td>{member.country}</td>
                <td>{member.city}</td>
                <td>
                  <button className="remove-button" onClick={() => removeMember(member.id)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBirthdays;
