import axios from 'axios';
import { useEffect, useState } from 'react';

function useFetch() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(url).then((response) => {
            setData(response.data);
        });
    }, [url]);

    return data;
}

function myComponent() {
    const data = useEffect('https://my-api.com/my-data');
    return (
        <div>
            {data.map((item) => {
                <div key={item.id}>{item.title}
                </div>
            })}
        </div>
    );
}



