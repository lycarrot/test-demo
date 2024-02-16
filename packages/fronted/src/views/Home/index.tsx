import { useState, useEffect, useRef } from 'react'
import { useImmer } from 'use-immer'
import { _getUserInfo, _getPicLists } from '@/api/user'
import { formatNumberWithCommas } from '@/util'
import ContentLoader from 'react-content-loader'
import { BeatLoader } from 'react-spinners'
import './index.less'

interface UserInfo {
  name: string
  num: number
  desc: string
  img: string
}
interface List {
  id: string
  download_url: string
  show: boolean
}
let isBottom = false
const User = () => {
  const [lists, setLists] = useImmer<List[]>([])
  const [page, setPage] = useImmer<{ page: number; limit: number }>({
    page: 1,
    limit: 9,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(Infinity)
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    num: 0,
    desc: '',
    img: '',
  })
  const [lang, setLang] = useState('en-gb');
  const containerRef = useRef<HTMLDivElement>()
  const getUserInfo = async () => {
    let info = await _getUserInfo()
    setUserInfo(info)
  }
  const getPicLists = async () => {
    try {
      if (loading || page.page * page.limit >= total) {
        return
      }
      setLoading(true)
      const res = await _getPicLists(page)
      setTotal(res.total)
      setLists((draft) => {
        draft.push(...res.lists)
      })
      isBottom = false
    } finally {
      setLoading(false)
      isBottom = false
    }
  }
  function onScroll() {
    if (containerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current
      if (scrollTop + clientHeight >= scrollHeight - 20 && !isBottom) {
        isBottom = true
        setPage((draft) => {
          draft.page += 1
        })
        //@ts-ignore
        containerRef?.current?.removeEventListener('scroll', onScroll)
      }
    }
  }
  const handleLang=(event:React.ChangeEvent<HTMLSelectElement>)=>{
    setLang(event.target.value)
  }
  useEffect(
    function () {
        //@ts-ignore
      containerRef?.current?.addEventListener('scroll', onScroll)
      return () => {
          //@ts-ignore
        containerRef?.current?.removeEventListener('scroll', onScroll)
      }
    },
    [containerRef, lists],
  )
  useEffect(() => {
    getUserInfo()
  }, [])
  useEffect(() => {
    getPicLists()
  }, [page])
  const ImagePlaceholder = () => (
    <ContentLoader
      speed={2}
      width={310}
      height={310}
      viewBox="0 0 310 310"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="3" ry="3" width="310" height="310" />
    </ContentLoader>
  )
  const handleImageLoad = (item: List, index: number) => {
    setLists((draft) => {
      draft.forEach((i) => {
        if (item.id === i.id) {
          draft[index].show = true
        }
      })
    })
  }
  return (
    <div className="home">
      <div className="header">
        <div className="wrap">
          <div className="wrap-l">Instagram</div>
          <div className="wrap-r">
            <div className="login" onClick={()=>{}}>Log In</div>
            <span className="sign"  onClick={()=>{}}>Sign up</span>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="info">
          <img src={userInfo.img}></img>
          <div className="detail">
            <span className="detail__1">{userInfo.name}</span>
            <span className="detail__2">
              {formatNumberWithCommas(userInfo.num)}
            </span>
            <span className="detail__3">{userInfo.desc}</span>
          </div>
        </div>
        <div className="pic">
          <span className="txt">Top posts</span>
          <div className="lists" ref={containerRef}>
            {lists.length ? (
              <ul>
                {lists.map((item, index) => (
                  <li key={item.id} className="li">
                    <img
                      src={item.download_url}
                      onLoad={() => handleImageLoad(item, index)}
                      style={{
                        width: item.show ? '100%' : 0,
                      }}
                    ></img>
                    {!item.show && <ImagePlaceholder />}
                  </li>
                ))}
              </ul>
            ) : (
              ''
            )}
            <div className="no">
              {loading && <BeatLoader color={'#0099f6'} loading={true} />}
              {!total ? <span>No datas</span> : ''}
              {lists.length && page.page * page.limit >= total ? (
                <span>At the bottom</span>
              ) : (
                ''
              )}
            </div>
          </div>

          <div></div>
        </div>
      </div>
      <div className="footer">
        <ul className="ad">
          <li>
            <a href="#">Meta</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Jobs</a>
          </li>
          <li>
            <a href="#">API</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Locations</a>
          </li>
          <li>
            <a href="#">Instagram Lite</a>
          </li>
          <li>
            <a href="#">Threads</a>
          </li>
          <li>
            <a href="#">Contact Uploading & Non-Users</a>
          </li>
          <li>
            <a href="#">Jobs</a>
          </li>
          <li>
            <a href="#">Meta Verified</a>
          </li>
        </ul>
        <div className="other">
          <select className="select"  value={lang} onChange={handleLang}>
            <option value="af">Afrikaans</option>
            <option value="ar">العربية</option>
            <option value="cs">Čeština</option>
            <option value="da">Dansk</option>
            <option value="de">Deutsch</option>
            <option value="el">Ελληνικά</option>
            <option value="en">English</option>
            <option value="en-gb">English (UK)</option>
            <option value="es">Español (España)</option>
            <option value="es-la">Español</option>
            <option value="fa">فارسی</option>
            <option value="fi">Suomi</option>
            <option value="fr">Français</option>
            <option value="he">עברית</option>
            <option value="id">Bahasa Indonesia</option>
            <option value="it">Italiano</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="ms">Bahasa Melayu</option>
            <option value="nb">Norsk</option>
            <option value="nl">Nederlands</option>
            <option value="pl">Polski</option>
            <option value="pt-br">Português (Brasil)</option>
            <option value="pt">Português (Portugal)</option>
            <option value="ru">Русский</option>
            <option value="sv">Svenska</option>
            <option value="th">ภาษาไทย</option>
            <option value="tl">Filipino</option>
            <option value="tr">Türkçe</option>
            <option value="zh-cn">中文(简体)</option>
            <option value="zh-tw">中文(台灣)</option>
            <option value="bn">বাংলা</option>
            <option value="gu">ગુજરાતી</option>
            <option value="hi">हिन्दी</option>
            <option value="hr">Hrvatski</option>
            <option value="hu">Magyar</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="ml">മലയാളം</option>
            <option value="mr">मराठी</option>
            <option value="ne">नेपाली</option>
            <option value="pa">ਪੰਜਾਬੀ</option>
            <option value="si">සිංහල</option>
            <option value="sk">Slovenčina</option>
            <option value="ta">தமிழ்</option>
            <option value="te">తెలుగు</option>
            <option value="ur">اردو</option>
            <option value="vi">Tiếng Việt</option>
            <option value="zh-hk">中文(香港)</option>
            <option value="bg">Български</option>
            <option value="fr-ca">Français (Canada)</option>
            <option value="ro">Română</option>
            <option value="sr">Српски</option>
            <option value="uk">Українська</option>
          </select>
          <span>© 2024 Instagram from Meta</span>
        </div>
      </div>
    </div>
  )
}

export default User
