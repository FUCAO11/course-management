import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

// 处理 GET 请求，获取特定客户
export async function GET(req, { params }) {
  await dbConnect();  // 确保数据库连接
  const { id } = params;  // 获取动态路由参数中的客户ID

  if (!id) {
    return new Response(JSON.stringify({ message: 'Customer ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const customer = await Customer.findById(id);  // 根据ID查找客户
  if (!customer) {
    return new Response(JSON.stringify({ message: 'Customer not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(customer), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// 处理 PATCH 请求，更新客户信息
export async function PATCH(req, { params }) {
  await dbConnect();  // 确保数据库连接
  const { id } = params;  // 获取动态路由参数中的客户ID
  const body = await req.json();  // 获取请求体内容

  if (!id) {
    return new Response(JSON.stringify({ message: 'Customer ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const updatedCustomer = await Customer.findByIdAndUpdate(id, body, { new: true });  // 根据ID更新客户
  if (!updatedCustomer) {
    return new Response(JSON.stringify({ message: 'Customer not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(updatedCustomer), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// 处理 DELETE 请求，删除客户
export async function DELETE(req, { params }) {
  await dbConnect();  // 确保数据库连接
  const { id } = params;  // 获取动态路由参数中的客户ID

  if (!id) {
    return new Response(JSON.stringify({ message: 'Customer ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const customer = await Customer.findById(id);  // 查找客户是否存在
  if (!customer) {
    return new Response(JSON.stringify({ message: 'Customer not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await Customer.findByIdAndDelete(id);  // 根据ID删除客户
  return new Response(JSON.stringify({ message: 'Customer deleted' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
