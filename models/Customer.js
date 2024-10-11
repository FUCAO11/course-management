import mongoose from 'mongoose'; // 删除了重复的导入

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  memberNumber: { type: Number, required: true },
  interests: { type: String, required: true },
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer; // 使用 ES6 模块导出
