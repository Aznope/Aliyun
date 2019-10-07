// c2
// img
var c2 = (function () {
    function Course() {
        var _id;
        var _name;

        function setId(id) {
            _id = id;
        }

        function setName(name) {
            _name = name;
        }

        function getId() {
            return _id;
        }

        function getName() {
            return _name;
        }

        function toString() {
            return _id + '\t' + _name;
        }

        return {
            setId: setId,
            setName: setName,
            getId: getId,
            getName: getName,
            toString: toString
        }
    }

    function CourseList() {
        var _courses = [];

        function add(course) {
            // 1) course可能是空
            if (course === null) {
                console.log('空课程不能添加！');
                return;
            }
            // 2) 重复添加课程
            for (let i = 0; i < _courses.length; i++) {
                if (_courses[i].getId() === course.getId()) {
                    console.log('不能重复添加课程!');
                    return;
                }
            }
            // 3) id号或者name是空值
            _courses.push(course);
        }

        function remove(id) {
            for (let i = 0; i < _courses.length; i++) {
                if (_courses[i].getId() === id) {
                    _courses.splice(i, 1);
                    return;
                }
            }

            console.log('未能找到该课程:' + id);
        }

        function getAll() {
            return _courses;
        }

        function getById(id) {
            for (let course of _courses) {
                if (course.getId() === id) {
                    return course;
                }
            }
            return null;
        }

        function getByName(name) {
            let result = [];
            for (let course of _courses) {
                if (course.getName().indexOf(name) >= 0) {
                    result.push(course);
                }
            }
            return result;
        }

        function toString() {
            let str = '';
            for (let i = 0; i < _courses.length; i++) {
                str += _courses[i].toString();
                str += '\n';
            }
            return str;
        }

        function update(id, name) {
            for (let course of _courses) {
                if (course.getId() === id) {
                    course.setName(name);
                }
            }
        }

        return {
            add: add,
            remove: remove,
            getAll: getAll,
            getById: getById,
            getByName: getByName,
            toString: toString,
            update: update
        }
    }

    function CourseService() {
        var _coursesData = [
            { id: '0001', name: 'RFID' },
            { id: '0002', name: 'WEB' },
            { id: '0003', name: 'JAVA' }
        ];

        return {
            data: _coursesData
        }
    }

    function testCourse() {
        var course1 = new Course();
        course1.setId('0001');
        course1.setName('Web前端开发');

        console.log(course1.toString());

        var course2 = new Course();
        course2.setId('0002');
        course2.setName('WSN开发');

        console.log(course2.toString());

        var course3 = new Course();
        course3.setId('0003');
        course3.setName('RFID');

        console.log(course3.toString());
    }

    //console.log('测试单课程****');
    //testCourse();

    function testCourseList() {
        var courseList = new CourseList();
        var course1 = new Course();
        course1.setId('0001');
        course1.setName('Web前端开发');
        courseList.add(course1);

        var course2 = new Course();
        course2.setId('0002');
        course2.setName('WSN开发');
        courseList.add(course2);

        var course3 = new Course();
        course3.setId('0003');
        course3.setName('RFID');
        courseList.add(course3);

        var course4 = new Course();
        course4.setId('0004');
        course4.setName('WSN实训');
        courseList.add(course4);
        console.log(courseList.toString());

        console.log('getById 0002');
        console.log(courseList.getById('0002').toString());
        console.log(courseList.getById('0005'));

        console.log('测试getByName');
        let r = courseList.getByName('WSN');
        for (let item of r) {
            console.log(item.toString());
        }
    }

    //console.log('测试课程列表****');
    //testCourseList();
    return {
        Course: Course,
        CourseList: CourseList,
        CourseService: CourseService
    }
}());

