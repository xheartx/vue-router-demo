/* eslint-disable */
import request from '@/utils/request'

// 获取投资记录列表
export function getInvestmentRecordList(data) {
  return new Promise((resolve, reject) => {
    resolve({'modulPage':{'rowCount':10,'rows':[{'id':201,'username':16129784091,'name':'乔芳','channel':1260898871,'is_firstshot':false,'product_name':'下水百法','invest_days':920,'financial_period':793,'residue_days':989,'buy_state':false,'buy_copies':66552,'input_principal':26511,'principal_earnings':1926,'investment_securities':3693,'investment_securities_source':58182,'investment_securities_earnings':61,'bonus_amount':20,'bonus_source':56784,'annualized_returns':20.89,'gross_proceeds':383.018,'invest_time':'1995-01-08 09:00:07','interest_time':'1985-07-11 13:31:26','clearing_time':'1998-01-17 22:01:41','due_time':'1978-04-03 22:52:43'},{'id':202,'username':15024473829,'name':'何桂英','channel':1268226464,'is_firstshot':false,'product_name':'况深得想少五','invest_days':217,'financial_period':697,'residue_days':575,'buy_state':true,'buy_copies':92845,'input_principal':94309,'principal_earnings':1018,'investment_securities':2977,'investment_securities_source':90030,'investment_securities_earnings':17,'bonus_amount':61,'bonus_source':86992,'annualized_returns':6.36,'gross_proceeds':110.242,'invest_time':'1989-11-21 08:59:55','interest_time':'1990-03-27 06:27:45','clearing_time':'2015-06-05 09:59:45','due_time':'2013-12-21 17:53:49'},{'id':203,'username':16191594279,'name':'姜超','channel':1261490179,'is_firstshot':false,'product_name':'治得解委六','invest_days':489,'financial_period':996,'residue_days':799,'buy_state':false,'buy_copies':84947,'input_principal':67321,'principal_earnings':1152,'investment_securities':4443,'investment_securities_source':55424,'investment_securities_earnings':80,'bonus_amount':53,'bonus_source':52752,'annualized_returns':22.49,'gross_proceeds':131.463,'invest_time':'2004-08-12 17:42:53','interest_time':'2001-06-16 02:32:13','clearing_time':'2015-07-10 01:40:46','due_time':'1999-03-22 12:35:42'},{'id':204,'username':18783368358,'name':'陆杰','channel':1268955483,'is_firstshot':false,'product_name':'了万民场节','invest_days':723,'financial_period':677,'residue_days':708,'buy_state':false,'buy_copies':10272,'input_principal':5296,'principal_earnings':1306,'investment_securities':1892,'investment_securities_source':12338,'investment_securities_earnings':18,'bonus_amount':32,'bonus_source':57084,'annualized_returns':8.14,'gross_proceeds':451.203,'invest_time':'2013-03-22 02:03:56','interest_time':'1970-04-08 19:11:35','clearing_time':'1992-06-30 16:31:18','due_time':'1997-07-14 13:06:38'},{'id':205,'username':18902232384,'name':'白艳','channel':1260392908,'is_firstshot':true,'product_name':'办质空','invest_days':854,'financial_period':643,'residue_days':889,'buy_state':true,'buy_copies':33549,'input_principal':43251,'principal_earnings':1118,'investment_securities':2211,'investment_securities_source':70948,'investment_securities_earnings':63,'bonus_amount':61,'bonus_source':60289,'annualized_returns':18.56,'gross_proceeds':484.522,'invest_time':'1995-09-13 00:27:51','interest_time':'1986-04-02 07:15:39','clearing_time':'1979-01-01 21:19:10','due_time':'2006-01-03 15:23:47'},{'id':206,'username':17447616007,'name':'龙明','channel':1264896136,'is_firstshot':false,'product_name':'同及里','invest_days':875,'financial_period':274,'residue_days':998,'buy_state':true,'buy_copies':60698,'input_principal':56276,'principal_earnings':1844,'investment_securities':4875,'investment_securities_source':81830,'investment_securities_earnings':39,'bonus_amount':52,'bonus_source':97935,'annualized_returns':10.72,'gross_proceeds':298.521,'invest_time':'2015-01-20 00:17:56','interest_time':'2015-08-10 15:02:46','clearing_time':'2014-03-02 03:04:45','due_time':'2004-09-05 04:16:05'},{'id':207,'username':10128923304,'name':'段平','channel':1264069482,'is_firstshot':true,'product_name':'被数者东','invest_days':631,'financial_period':829,'residue_days':458,'buy_state':false,'buy_copies':39796,'input_principal':36321,'principal_earnings':1970,'investment_securities':2480,'investment_securities_source':54943,'investment_securities_earnings':83,'bonus_amount':28,'bonus_source':95602,'annualized_returns':4.82,'gross_proceeds':92.744,'invest_time':'1995-11-23 10:38:54','interest_time':'1981-12-14 01:40:43','clearing_time':'2005-02-21 06:43:57','due_time':'1994-10-28 17:07:40'},{'id':208,'username':18100240792,'name':'白敏','channel':1264052208,'is_firstshot':false,'product_name':'区场二都','invest_days':215,'financial_period':525,'residue_days':910,'buy_state':false,'buy_copies':95991,'input_principal':65731,'principal_earnings':1025,'investment_securities':2301,'investment_securities_source':45337,'investment_securities_earnings':28,'bonus_amount':34,'bonus_source':42581,'annualized_returns':22.35,'gross_proceeds':486.884,'invest_time':'2011-12-26 11:55:48','interest_time':'1972-08-09 07:28:47','clearing_time':'2011-10-09 14:53:29','due_time':'2006-05-06 15:25:46'},{'id':209,'username':13687031549,'name':'汪静','channel':1263080086,'is_firstshot':true,'product_name':'基名产样','invest_days':952,'financial_period':351,'residue_days':292,'buy_state':false,'buy_copies':92468,'input_principal':97301,'principal_earnings':1128,'investment_securities':1174,'investment_securities_source':75102,'investment_securities_earnings':13,'bonus_amount':18,'bonus_source':12196,'annualized_returns':3.85,'gross_proceeds':73.254,'invest_time':'1971-08-07 08:21:21','interest_time':'2007-03-13 03:48:46','clearing_time':'1980-08-15 06:08:16','due_time':'1983-05-16 18:55:54'},{'id':210,'username':14633817035,'name':'林伟','channel':1264754649,'is_firstshot':false,'product_name':'接价备文','invest_days':415,'financial_period':636,'residue_days':332,'buy_state':false,'buy_copies':76040,'input_principal':36668,'principal_earnings':1034,'investment_securities':2996,'investment_securities_source':37066,'investment_securities_earnings':20,'bonus_amount':19,'bonus_source':21506,'annualized_returns':16.33,'gross_proceeds':414.412,'invest_time':'1980-08-18 23:13:41','interest_time':'1991-08-24 09:54:17','clearing_time':'1974-04-06 16:39:50','due_time':'2007-06-26 17:40:15'}]}})
  })
  // return request({
  //   url: '/product/getInvestmentRecordList',
  //   method: 'post',
  //   data
  // })
}
// 查找投资记录列表
export function findInvestmentRecordList(data) {
  return request({
    url: '/product/findInvestmentRecordList',
    method: 'post',
    data
  })
}
//产品发布
export function launchProduct(data) {
  return request({
    url: '/launchProduct',
    method: 'post',
    data
  })
}

// 虚拟投资
export function virtualInvestmentProduct(data) {
  return request({
    url: '/product/virtualInvestmentProcduct',
    method: 'post',
    data
  })
}

// 获取虚拟投资记录
export function virtualInvestmentRecord(data) {
  return request({
    url: '/product/virtualInvestmentRecord',
    method: 'post',
    data
  })
}

// 获取产品详情
export function getProductDetail(data) {
  return request({
    url: '/product/getProductDetail',
    method: 'post',
    data
  })
}
