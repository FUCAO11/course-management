import dbConnect from '@/lib/db';  // 如果配置了别名，否则使用相对路径
import Customer from '@/models/Customer';  // 确保正确导入Customer模型


// 处理 GET 请求，获取所有客户
export async function GET(req) {
  await dbConnect();
  const customers = await Customer.find();
  return new Response(JSON.stringify(customers), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// 处理 POST 请求，添加新客户
export async function POST(req) {
  await dbConnect();
  const body = await req.json();  // 解析请求体中的JSON数据
  const customer = new Customer(body);
  await customer.save();  // 保存新客户
  return new Response(JSON.stringify(customer), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
