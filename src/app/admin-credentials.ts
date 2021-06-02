export class Init {
  load() {
    if (localStorage.getItem('admin') === null || localStorage.getItem('admin') == undefined) {
      console.log('Creating admin credentials...');
      let admin =
      {
        username: 'ankit',
        password: 'pass',
      };
      localStorage.setItem('admin', JSON.stringify(admin));
      return
    } else {
      console.log('Admin credentials already there');
    }
  }
}