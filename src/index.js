import React from 'react';
import ReactDOM from 'react-dom';
import initialData from './data';
import Column from './components/Column';
import reportWebVitals from './reportWebVitals';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import config from './config';

const Container = styled.div`
    display: flex;
    padding: 30px;
    align-items: center;
    justify-content: center;
`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialData;
    }

    onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) { return }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];
        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);

            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            }

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                }
            }

            this.setState(newState);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            }
        }
        this.setState(newState);
    };

    componentDidMount() {
        axios.get(`${config.API_SERVER_URL}candidates`)
            .then(response => {
                let candidates = response.data.candidates
                candidates.forEach((element, index) => {
                    candidates[index].id = 'task-' + element.id;
                });
                const columnIds = candidates.map(obj => obj.id)

                let newStateColumn = { ...this.state.columns }
                newStateColumn['column-1'].taskIds = columnIds

                this.setState({
                    tasks: candidates,
                    columns: newStateColumn
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    render() {
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                {
                    this.state.columnOrder.map((columnId) => {
                        const column = this.state.columns[columnId];
                        const tasks = this.state.tasks.filter(obj => column.taskIds.includes(obj.id))
                        if (column.title === 'Candidates') {
                            return <Column key={column.id} column={column} tasks={tasks} />;
                        }
                    })
                }
                <div>
                    {

                        this.state.columnOrder.map((columnId) => {
                            const column = this.state.columns[columnId];
                            const tasks = this.state.tasks.filter(obj => column.taskIds.includes(obj.id))

                            if (column.title !== 'Candidates') {
                                return <Column key={column.id} column={column} tasks={tasks} />;
                            }
                        })
                    }
                </div>
            </DragDropContext>
        )
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Container>
            <App />
        </Container>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
