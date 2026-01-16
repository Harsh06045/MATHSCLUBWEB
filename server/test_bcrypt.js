const bcrypt = require('bcryptjs');
async function test() {
    console.log('bcrypt keys:', Object.keys(bcrypt));
    try {
        const salt = await bcrypt.genSalt(10);
        console.log('Salt generated:', salt);
        const hash = await bcrypt.hash('123', salt);
        console.log('Hash generated:', hash);
        process.exit(0);
    } catch (err) {
        console.error('Bcrypt test failed:', err);
        process.exit(1);
    }
}
test();
