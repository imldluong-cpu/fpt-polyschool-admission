import { useState, useRef } from 'react';
import { Search, ChevronRight, CheckCircle, GraduationCap, Briefcase, Palette, Code, MapPin, Award, BookOpen, Clock, Megaphone, MonitorSmartphone, ChevronDown, ChevronUp } from 'lucide-react';
import Select from 'react-select';
import './App.css';
import { highSchools, quizQuestions, resultMapping } from './data';

const schoolOptions = highSchools.map(school => ({
  value: school.id,
  label: school.name
}));

function App() {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [myScore, setMyScore] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);

  const introRef = useRef(null);
  const quizRef = useRef(null);

  const schoolData = selectedSchool ? highSchools.find(s => s.id === Number(selectedSchool)) : null;

  let passStatus = null;
  let suggestedSchools = [];
  
  if (myScore) {
    const userScore = Number(myScore);
    
    if (schoolData) {
      if (userScore >= schoolData.score) {
        passStatus = "Đậu";
      } else {
        passStatus = "Rớt";
      }
    }
    
    // Suggest schools if no school is selected or if the user failed the selected school
    if (!schoolData || passStatus === "Rớt") {
      suggestedSchools = highSchools
        .filter(s => (!schoolData || s.id !== schoolData.id) && s.score <= userScore && s.nv3Quota > 0 && !s.name.includes("Test"))
        .sort((a, b) => b.score - a.score) 
        .slice(0, 5);
    }
  }

  const handleLookup = (e) => {
    e.preventDefault();
    if (myScore) {
      setShowAllSuggestions(false);
      setShowModal(true);
    }
  };

  const scrollToSection = (ref) => {
    setShowModal(false);
    setShowIntro(true);
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleQuizSelect = (type) => {
    const newAnswers = [...quizAnswers, type];
    setQuizAnswers(newAnswers);

    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(curr => curr + 1);
    } else {
      // Calculate result
      const counts = newAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {});
      
      let maxType = newAnswers[0];
      let maxCount = 0;
      for (const type in counts) {
        if (counts[type] > maxCount) {
          maxCount = counts[type];
          maxType = type;
        }
      }
      setQuizResult(resultMapping[maxType]);
    }
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <header className="hero">
        <h1>
          <span>FPT PolySchool Cần Thơ</span><br/>
          <span style={{ display: 'block', fontSize: '1rem', fontWeight: '500', color: '#666', marginTop: '5px', marginBottom: '10px' }}>
            <MapPin size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px', color: '#f26522' }}/>
            Đường số 22, KDC Hoàng Quân, P. Cái Răng, TP. Cần Thơ
          </span>
          Tra cứu kết quả xét tuyển NV2 năm 2026
        </h1>
        <p>Hành trang vững bước tương lai. Xem ngay kết quả tuyển sinh lớp 10 năm 2026 chính xác và nhanh chóng nhất.</p>
      </header>

      {/* Lookup Section */}
      <section className="section-container">
        <div className="card">
          <form onSubmit={handleLookup}>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Chọn trường THPT NV2 của bạn</label>
              <Select
                options={schoolOptions}
                placeholder="-- Nhập hoặc chọn trường --"
                isSearchable={true}
                value={schoolOptions.find(opt => opt.value === Number(selectedSchool)) || null}
                onChange={(selectedOption) => {
                  setSelectedSchool(selectedOption ? selectedOption.value : '');
                }}
                noOptionsMessage={() => "Không tìm thấy trường"}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    padding: '4px',
                    borderRadius: '8px',
                    borderColor: state.isFocused ? '#f26522' : '#ddd',
                    boxShadow: state.isFocused ? '0 0 0 1px #f26522' : 'none',
                    '&:hover': { borderColor: '#f26522' },
                    fontSize: '1rem'
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? '#f26522' : state.isFocused ? '#fff3ec' : 'white',
                    color: state.isSelected ? 'white' : '#333',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  })
                }}
              />
            </div>

            {schoolData && (
              <div className="result-box">
                <p>Điểm chuẩn NV2 năm 2026:</p>
                <div className="score-display">{schoolData.score.toFixed(2)}</div>
              </div>
            )}

            <div className="form-group" style={{ marginTop: '24px' }}>
              <label>Nhập điểm thi thực tế của bạn</label>
              <input 
                type="number" 
                step="0.01"
                className="form-control" 
                placeholder="Ví dụ: 18.5"
                value={myScore}
                onChange={(e) => setMyScore(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn">
              <Search size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }}/>
              Xem kết quả
            </button>
          </form>
        </div>
      </section>

      {/* Result Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <h2>Kết quả tuyển sinh 2026</h2>
            
            {schoolData && (
              <div className="result-box" style={{ margin: '20px 0', textAlign: 'center', borderRadius: '8px' }}>
                <p style={{ margin: 0, fontSize: '1.1rem', color: '#666' }}>Trường {schoolData.name}</p>
                <div className="score-display" style={{ fontSize: '2.5rem', margin: '10px 0' }}>
                  {schoolData.score.toFixed(2)}
                </div>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Chỉ tiêu 2026: {schoolData.quota} học sinh</p>
              </div>
            )}

            {passStatus === "Đậu" && (
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#e6ffe6', borderRadius: '8px', border: '1px solid #22c55e' }}>
                <h3 style={{ color: '#16a34a', margin: 0, fontSize: '1.5rem' }}>🎉 CHÚC MỪNG BẠN!</h3>
                <p style={{ marginTop: '10px', fontSize: '1.1rem' }}>Bạn đã đủ điểm trúng tuyển vào {schoolData?.name}.</p>
              </div>
            )}
            
            {passStatus === "Rớt" && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ padding: '15px', backgroundColor: '#fff0f0', borderRadius: '8px', border: '1px solid #ef4444', marginBottom: '20px' }}>
                  <h3 style={{ color: '#dc2626', margin: 0, fontSize: '1.3rem' }}>Rất tiếc!</h3>
                  <p style={{ marginTop: '10px' }}>Điểm thi của bạn chưa đủ để trúng tuyển vào {schoolData?.name}.</p>
                </div>
              </div>
            )}
            
            {(!schoolData || passStatus === "Rớt") && (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ textAlign: 'left', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' }}>🎯 Gợi ý trường phù hợp đăng ký NV3:</h3>
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                  {suggestedSchools.slice(0, showAllSuggestions ? 5 : 2).map((s, index) => (
                    <li key={index} style={{ padding: '12px 15px', border: '1px solid #eaeaea', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <strong>{index + 1}. {s.name}</strong>
                        <span style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>Còn {s.nv3Quota} chỉ tiêu NV3</span>
                      </div>
                      <span style={{ color: '#f26522', fontWeight: 'bold' }}>{s.score.toFixed(2)} đ</span>
                    </li>
                  ))}

                  {suggestedSchools.length > 2 && !showAllSuggestions && (
                    <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                      <button type="button" onClick={() => setShowAllSuggestions(true)} style={{ background: 'none', border: 'none', color: '#0033a0', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', fontWeight: '500' }}>
                        Xem thêm trường <ChevronDown size={16} style={{ marginLeft: '4px' }}/>
                      </button>
                    </div>
                  )}
                  {suggestedSchools.length > 2 && showAllSuggestions && (
                    <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                      <button type="button" onClick={() => setShowAllSuggestions(false)} style={{ background: 'none', border: 'none', color: '#0033a0', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', fontWeight: '500' }}>
                        Thu gọn <ChevronUp size={16} style={{ marginLeft: '4px' }}/>
                      </button>
                    </div>
                  )}
                  
                  <p style={{ textAlign: 'center', fontWeight: 'bold', margin: '20px 0 10px', color: '#555', textTransform: 'uppercase', fontSize: '0.95rem' }}>BẠN CŨNG CÓ THỂ CHỌN</p>
                  <li style={{ padding: '15px', border: '2px solid #0033a0', backgroundColor: '#f8faff', borderRadius: '8px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <strong style={{ color: '#0033a0', fontSize: '1.1rem' }}>FPT PolySchool Cần Thơ</strong>
                      <span style={{ backgroundColor: '#f26522', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>HOT</span>
                    </div>
                    <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>✅ Xét học bạ lớp 9 - Nhập học ngay</p>
                    <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>✅ Học Văn hóa phổ thông kết hợp chuyên ngành</p>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>✅ Sau 3 năm nhận bằng Cao đẳng chính quy</p>
                  </li>
                </ul>
              </div>
            )}
            
            <div className="modal-actions" style={{ marginTop: '24px' }}>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>
                Đóng
              </button>
              <button className="btn" onClick={() => scrollToSection(introRef)}>
                Tìm hiểu thêm FPT PolySchool
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Intro Section */}
        <section className="intro-section" ref={introRef}>
          <div className="card" style={{ maxWidth: '1000px', backgroundColor: 'transparent', boxShadow: 'none', border: 'none' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Khởi đầu mới tại FPT PolySchool Cần Thơ
            </h2>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '30px' }}>
              HỌC NHANH - LÀM SỚM
            </p>
            
            <div className="intro-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              
              {/* Box 1: Nổi bật */}
              <div className="feature-card" style={{ borderTop: '4px solid #f26522', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: '#0033a0', marginBottom: '20px', fontSize: '1.3rem', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' }}>⭐ NỔI BẬT</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                  <li style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
                    <CheckCircle size={32} color="#f26522" style={{ marginRight: '16px', minWidth: '32px' }} />
                    <span><strong>Xét học bạ lớp 9</strong></span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
                    <GraduationCap size={32} color="#0033a0" style={{ marginRight: '16px', minWidth: '32px' }} />
                    <span><strong>Học 3 năm</strong><br/>nhận bằng Cao đẳng chính quy</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: 3 Chuyên ngành hot */}
              <div className="feature-card" style={{ borderTop: '4px solid #0033a0', textAlign: 'left' }}>
                <h3 style={{ color: '#f26522', marginBottom: '20px', fontSize: '1.3rem', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' }}>🔥 3 CHUYÊN NGÀNH HOT</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                    <Palette size={24} color="#0033a0" style={{ marginRight: '12px', minWidth: '24px' }} />
                    <span>1. <strong>Thiết kế đồ họa</strong></span>
                  </li>
                  <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                    <Megaphone size={24} color="#f26522" style={{ marginRight: '12px', minWidth: '24px' }} />
                    <span>2. <strong>Digital Marketing</strong></span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <MonitorSmartphone size={24} color="#0033a0" style={{ marginRight: '12px', minWidth: '24px' }} />
                    <span>3. <strong>Ứng dụng phần mềm</strong></span>
                  </li>
                </ul>
              </div>

              {/* Box 3: Lộ trình học tập */}
              <div className="feature-card" style={{ borderTop: '4px solid #f26522', textAlign: 'left' }}>
                <h3 style={{ color: '#0033a0', marginBottom: '20px', fontSize: '1.3rem', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' }}>📖 LỘ TRÌNH HỌC TẬP</h3>
                <div style={{ borderLeft: '3px solid #eaeaea', paddingLeft: '20px', marginLeft: '10px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-9px', top: '2px', width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#f26522' }}></div>
                  <div style={{ marginBottom: '20px' }}>
                    <strong style={{ color: '#f26522' }}>Năm 1</strong>
                    <p style={{ margin: '5px 0 0 0' }}>Văn hóa phổ thông</p>
                  </div>

                  <div style={{ position: 'absolute', left: '-9px', top: '75px', width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#0033a0' }}></div>
                  <div style={{ marginBottom: '20px' }}>
                    <strong style={{ color: '#0033a0' }}>Năm 2</strong>
                    <p style={{ margin: '5px 0 0 0' }}>Chuyên ngành giai đoạn trung cấp</p>
                  </div>

                  <div style={{ position: 'absolute', left: '-9px', top: '150px', width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#f26522' }}></div>
                  <div>
                    <strong style={{ color: '#f26522' }}>Năm 3</strong>
                    <p style={{ margin: '5px 0 0 0' }}>Chuyên ngành giai đoạn cao đẳng</p>
                  </div>
                </div>
              </div>

              {/* Box 4: Học bổng */}
              <div className="feature-card" style={{ borderTop: '4px solid #f26522', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff3ec' }}>
                <Award size={64} color="#f26522" style={{ marginBottom: '16px' }} />
                <h3 style={{ color: '#0033a0', fontSize: '1.5rem', marginBottom: '8px' }}>HỌC BỔNG</h3>
                <p style={{ fontSize: '2.5rem', fontWeight: '900', color: '#f26522', margin: 0, lineHeight: '1.1' }}>LÊN ĐẾN 50%</p>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginTop: '12px', marginBottom: '12px' }}>dành cho học sinh giỏi</p>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5', textAlign: 'left', display: 'inline-block' }}>
                  <p style={{ margin: 0 }}>• ĐTB Toán, Văn, Lý, Sử từ 8.0</p>
                  <p style={{ margin: 0 }}>• Hoặc Điểm thi 10 từ 23 điểm</p>
                </div>
              </div>

            </div>

            <div style={{ marginTop: '60px' }}>
              <button className="btn" style={{ maxWidth: '400px' }} onClick={() => quizRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                Tìm hiểu chuyên ngành phù hợp <ChevronRight size={20} style={{ display: 'inline', verticalAlign: 'middle' }}/>
              </button>
            </div>
          </div>
        </section>

      {/* Quiz Section */}
        <section className="quiz-section" ref={quizRef}>
          <div className="card quiz-card">
            {!quizResult ? (
              <>
                <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Khám phá bản thân</h2>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${((currentQuiz) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
                
                <h3 style={{ marginBottom: '24px', fontSize: '1.3rem' }}>
                  Câu {currentQuiz + 1}: {quizQuestions[currentQuiz].question}
                </h3>
                
                <div className="quiz-options">
                  {quizQuestions[currentQuiz].options.map((opt, index) => (
                    <button 
                      key={index} 
                      className="quiz-option"
                      onClick={() => handleQuizSelect(opt.type)}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="quiz-result">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                  {quizResult.name === 'Thiết kế đồ họa' && <Palette size={64} color="var(--primary-color)" />}
                  {quizResult.name === 'Ứng dụng phần mềm' && <MonitorSmartphone size={64} color="var(--primary-color)" />}
                  {quizResult.name === 'Digital Marketing' && <Megaphone size={64} color="var(--primary-color)" />}
                </div>
                <h3>{quizResult.name}</h3>
                <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>{quizResult.description}</p>
                <button className="btn" onClick={() => window.open('https://zalo.me/0974680024', '_blank')}>
                  Đăng ký tư vấn ngay
                </button>
                <button 
                  className="btn btn-outline" 
                  style={{ marginTop: '16px', display: 'block', width: '100%' }}
                  onClick={() => {
                    setCurrentQuiz(0);
                    setQuizAnswers([]);
                    setQuizResult(null);
                  }}
                >
                  Làm lại bài trắc nghiệm
                </button>
              </div>
            )}
          </div>
        </section>

      {/* Floating Buttons */}
      <div className="floating-buttons">
        <a href="https://zalo.me/0974680024" target="_blank" rel="noopener noreferrer" className="float-btn zalo-btn" title="Chat Zalo">
          <div style={{ fontWeight: 'bold', color: 'white', fontSize: '14px', letterSpacing: '0.5px' }}>Zalo</div>
        </a>
        <a href="https://m.me/fptpolyschoolcantho" target="_blank" rel="noopener noreferrer" className="float-btn messenger-btn" title="Facebook / Messenger">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg" alt="Messenger" width="34" height="34" />
        </a>
      </div>

    </div>
  );
}

export default App;
