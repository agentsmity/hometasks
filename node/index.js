import * as hw1 from './tasks/homework1.js';

switch (process.argv[2]) {
    case 'task_1_1':
        hw1.run_1_1();
        break;
    case 'task_1_2':
        hw1.run_1_2();
        break;
}