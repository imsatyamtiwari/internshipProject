import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react'

function App() {
  const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Fetch data on initial render
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            setData(responseData.data);
            setFilteredData(responseData.data); // Initialize filteredData with the full dataset
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        // Filter the data based on the search term
        const searchTerm = value.toLowerCase();
        const filtered = data.filter(item => 
            item.id.toLowerCase().includes(searchTerm) ||
            item.desc.toLowerCase().includes(searchTerm) ||
            item.transactions.quantity.toLowerCase().includes(searchTerm)
        );
        setFilteredData(filtered);
    };

    return (
        <div>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder="Enter search term"
            />

            {filteredData.length > 0 ? (
                <div>
                    <h3>Fetched Data:</h3>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.desc}</td>
                                    <td>{item.transactions.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No data found</p>
            )}
        </div>
    );
}

export default App;
