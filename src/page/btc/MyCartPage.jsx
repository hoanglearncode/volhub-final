import React, { useState, useMemo } from 'react';
import { 
    ShoppingCart, 
    Trash2, 
    Plus, 
    Minus, 
    Heart, 
    HeartOff, 
    Tag, 
    CreditCard, 
    Clock, 
    CheckCircle, 
    AlertCircle,
    ArrowRight,
    RotateCcw,
    Save,
    Eye,
    Edit3,
    Copy,
    X
} from 'lucide-react';

export default function MyCartsPage() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            serviceId: 'basic',
            name: 'Gói Cơ Bản',
            description: 'Quản lý tối đa 50 CTV/TNV với các tính năng cơ bản',
            price: 299000,
            originalPrice: 399000,
            quantity: 2,
            duration: 'tháng',
            category: 'Quản lý nhân sự',
            image: '/api/placeholder/80/80',
            addedDate: '2024-12-01',
            isWishlisted: true,
            features: [
                'Quản lý tối đa 50 CTV/TNV',
                'Báo cáo cơ bản',
                'Hỗ trợ email',
                'Lưu trữ 5GB'
            ],
            status: 'active'
        },
        {
            id: 2,
            serviceId: 'pro',
            name: 'Gói Chuyên Nghiệp',
            description: 'Giải pháp tối ưu cho tổ chức vừa và lớn',
            price: 599000,
            originalPrice: 799000,
            quantity: 1,
            duration: 'tháng',
            category: 'Quản lý nhân sự',
            image: '/api/placeholder/80/80',
            addedDate: '2024-12-01',
            isWishlisted: false,
            features: [
                'Quản lý không giới hạn CTV/TNV',
                'Báo cáo nâng cao & Analytics',
                'Hỗ trợ 24/7',
                'Lưu trữ 50GB',
                'Tích hợp API'
            ],
            status: 'active'
        },
        {
            id: 3,
            serviceId: 'training',
            name: 'Khóa đào tạo CTV',
            description: 'Chương trình đào tạo chuyên sâu cho cộng tác viên',
            price: 1500000,
            originalPrice: 2000000,
            quantity: 1,
            duration: 'khóa học',
            category: 'Đào tạo',
            image: '/api/placeholder/80/80',
            addedDate: '2024-11-28',
            isWishlisted: true,
            features: [
                '40 giờ học trực tuyến',
                'Tài liệu đầy đủ',
                'Chứng chỉ hoàn thành',
                'Hỗ trợ 1-1'
            ],
            status: 'pending'
        }
    ]);

    const [savedCarts, setSavedCarts] = useState([
        {
            id: 1,
            name: 'Cart cho Q1 2025',
            items: 2,
            total: 1198000,
            savedDate: '2024-11-25',
            description: 'Các dịch vụ cần thiết cho quý 1'
        },
        {
            id: 2,
            name: 'Gói mở rộng',
            items: 3,
            total: 2397000,
            savedDate: '2024-11-20',
            description: 'Dành cho giai đoạn mở rộng tổ chức'
        }
    ]);

    const [selectedItems, setSelectedItems] = useState(new Set([1, 2, 3]));
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [showSaveCartModal, setShowSaveCartModal] = useState(false);
    const [newCartName, setNewCartName] = useState('');
    const [cartDescription, setCartDescription] = useState('');

    // Available coupons
    const availableCoupons = {
        'WELCOME20': { discount: 0.2, type: 'percentage', description: 'Giảm 20% cho khách hàng mới' },
        'SAVE100K': { discount: 100000, type: 'fixed', description: 'Giảm 100,000đ cho đơn hàng trên 1 triệu' },
        'BULK15': { discount: 0.15, type: 'percentage', description: 'Giảm 15% cho đơn hàng số lượng lớn' }
    };

    // Calculate totals
    const cartSummary = useMemo(() => {
        const selectedCartItems = cartItems.filter(item => selectedItems.has(item.id));
        const subtotal = selectedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const originalTotal = selectedCartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
        const savings = originalTotal - subtotal;
        
        let discount = 0;
        if (appliedCoupon) {
            if (appliedCoupon.type === 'percentage') {
                discount = subtotal * appliedCoupon.discount;
            } else {
                discount = Math.min(appliedCoupon.discount, subtotal);
            }
        }
        
        const tax = (subtotal - discount) * 0.1; // 10% VAT
        const total = subtotal - discount + tax;
        
        return {
            itemCount: selectedCartItems.length,
            subtotal,
            originalTotal,
            savings,
            discount,
            tax,
            total
        };
    }, [cartItems, selectedItems, appliedCoupon]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const handleQuantityChange = (id, delta) => {
        setCartItems(prev => prev.map(item => 
            item.id === id 
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        ));
    };

    const handleRemoveItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    };

    const handleSelectItem = (id) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleSelectAll = () => {
        if (selectedItems.size === cartItems.length) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(cartItems.map(item => item.id)));
        }
    };

    const handleWishlist = (id) => {
        setCartItems(prev => prev.map(item => 
            item.id === id 
                ? { ...item, isWishlisted: !item.isWishlisted }
                : item
        ));
    };

    const handleApplyCoupon = () => {
        const coupon = availableCoupons[couponCode.toUpperCase()];
        if (coupon) {
            setAppliedCoupon({ ...coupon, code: couponCode.toUpperCase() });
        } else {
            alert('Mã giảm giá không hợp lệ!');
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
    };

    const handleSaveCart = () => {
        if (!newCartName.trim()) {
            alert('Vui lòng nhập tên giỏ hàng');
            return;
        }
        
        const newSavedCart = {
            id: Date.now(),
            name: newCartName,
            items: selectedItems.size,
            total: cartSummary.total,
            savedDate: new Date().toISOString().split('T')[0],
            description: cartDescription
        };
        
        setSavedCarts(prev => [newSavedCart, ...prev]);
        setShowSaveCartModal(false);
        setNewCartName('');
        setCartDescription('');
        alert('Đã lưu giỏ hàng thành công!');
    };

    const CartItem = ({ item }) => (
        <div className="bg-white rounded-lg border p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start space-x-4">
                {/* Checkbox */}
                <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="mt-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                
                {/* Service Image */}
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                    <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                
                {/* Item Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    item.status === 'active' 
                                        ? 'bg-green-100 text-green-800'
                                        : item.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {item.status === 'active' ? 'Hoạt động' : 
                                     item.status === 'pending' ? 'Chờ duyệt' : 'Không hoạt động'}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    {item.category}
                                </span>
                                <span>•</span>
                                <span>Thêm ngày {new Date(item.addedDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                        </div>
                        
                        {/* Wishlist & Remove */}
                        <div className="flex items-center space-x-2 ml-4">
                            <button
                                onClick={() => handleWishlist(item.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                {item.isWishlisted ? (
                                    <Heart className="w-5 h-5 text-red-500 fill-current" />
                                ) : (
                                    <HeartOff className="w-5 h-5" />
                                )}
                            </button>
                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    
                    {/* Features */}
                    <div className="mt-3 mb-4">
                        <div className="grid grid-cols-2 gap-1">
                            {item.features.slice(0, 4).map((feature, index) => (
                                <div key={index} className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                                    <span className="truncate">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-blue-600">
                                    {formatCurrency(item.price)}
                                </span>
                                {item.originalPrice > item.price && (
                                    <span className="text-sm text-gray-500 line-through">
                                        {formatCurrency(item.originalPrice)}
                                    </span>
                                )}
                                <span className="text-sm text-gray-500">/{item.duration}</span>
                            </div>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                                disabled={item.quantity <= 1}
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const SavedCartCard = ({ cart }) => (
        <div className="bg-white rounded-lg border p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{cart.name}</h3>
                <span className="text-sm text-gray-500">
                    {new Date(cart.savedDate).toLocaleDateString('vi-VN')}
                </span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{cart.description}</p>
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    {cart.items} dịch vụ • {formatCurrency(cart.total)}
                </div>
                <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="text-center py-16">
                        <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h2>
                        <p className="text-gray-600 mb-6">Chưa có dịch vụ nào trong giỏ hàng của bạn</p>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            Khám phá dịch vụ
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng của tôi</h1>
                        <p className="text-gray-600 mt-1">
                            {cartItems.length} dịch vụ • {cartSummary.itemCount} đã chọn
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setShowSaveCartModal(true)}
                            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Lưu giỏ hàng
                        </button>
                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <Plus className="w-4 h-4 mr-2" />
                            Thêm dịch vụ
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Select All */}
                        <div className="bg-white rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.size === cartItems.length && cartItems.length > 0}
                                        onChange={handleSelectAll}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="font-medium text-gray-900">
                                        Chọn tất cả ({cartItems.length} dịch vụ)
                                    </span>
                                </label>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>Tiết kiệm: {formatCurrency(cartSummary.savings)}</span>
                                    <button className="text-red-600 hover:text-red-700">
                                        Xóa đã chọn
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>

                        {/* Coupon Section */}
                        <div className="bg-white rounded-lg border p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Mã giảm giá</h3>
                            {appliedCoupon ? (
                                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <Tag className="w-5 h-5 text-green-600 mr-3" />
                                        <div>
                                            <p className="font-medium text-green-800">{appliedCoupon.code}</p>
                                            <p className="text-sm text-green-600">{appliedCoupon.description}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleRemoveCoupon}
                                        className="text-green-600 hover:text-green-700"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex space-x-3">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Nhập mã giảm giá"
                                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg border p-6 sticky top-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>
                            
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tạm tính ({cartSummary.itemCount} dịch vụ):</span>
                                    <span className="font-medium">{formatCurrency(cartSummary.subtotal)}</span>
                                </div>
                                
                                {cartSummary.savings > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Tiết kiệm:</span>
                                        <span>-{formatCurrency(cartSummary.savings)}</span>
                                    </div>
                                )}
                                
                                {appliedCoupon && cartSummary.discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Giảm giá ({appliedCoupon.code}):</span>
                                        <span>-{formatCurrency(cartSummary.discount)}</span>
                                    </div>
                                )}
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-600">VAT (10%):</span>
                                    <span className="font-medium">{formatCurrency(cartSummary.tax)}</span>
                                </div>
                            </div>
                            
                            <div className="border-t pt-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-lg font-semibold">Tổng cộng:</span>
                                    <span className="text-lg font-bold text-blue-600">
                                        {formatCurrency(cartSummary.total)}
                                    </span>
                                </div>
                            </div>
                            
                            <button
                                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
                                disabled={cartSummary.itemCount === 0}
                            >
                                Thanh toán ngay
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                            
                            <p className="text-xs text-gray-500 text-center mt-3">
                                Miễn phí hỗ trợ kỹ thuật và bảo hành
                            </p>
                        </div>

                        {/* Saved Carts */}
                        {savedCarts.length > 0 && (
                            <div className="bg-white rounded-lg border p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Giỏ hàng đã lưu</h3>
                                <div className="space-y-3">
                                    {savedCarts.slice(0, 3).map(cart => (
                                        <SavedCartCard key={cart.id} cart={cart} />
                                    ))}
                                </div>
                                {savedCarts.length > 3 && (
                                    <button className="w-full mt-3 text-blue-600 hover:text-blue-700 text-sm">
                                        Xem thêm ({savedCarts.length - 3})
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Save Cart Modal */}
            {showSaveCartModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Lưu giỏ hàng</h3>
                            <button
                                onClick={() => setShowSaveCartModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên giỏ hàng *
                                </label>
                                <input
                                    type="text"
                                    value={newCartName}
                                    onChange={(e) => setNewCartName(e.target.value)}
                                    placeholder="Ví dụ: Cart cho Q1 2025"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mô tả
                                </label>
                                <textarea
                                    value={cartDescription}
                                    onChange={(e) => setCartDescription(e.target.value)}
                                    placeholder="Mô tả ngắn về giỏ hàng này..."
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowSaveCartModal(false)}
                                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSaveCart}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Lưu giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}