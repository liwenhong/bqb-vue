<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'children'}"
      >
      <el-table-column
        fixed
        prop="gifId"
        label="gifId"
        width="180">
      </el-table-column>
      <el-table-column
        prop="gifDesc"
        label="模版描述"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="gifPath"
        label="gif图片"
        width="120">
        <template slot-scope="scope">
          <div >
            <img style="height: 50px;display: block;"  :src="scope.row.gifPath" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="gifName"
        label="gif名称"
        :show-overflow-tooltip="true"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="gifContent"
        label="gif内容"
        :show-overflow-tooltip="true"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="gifTime"
        label="gif时长"
        width="300">
      </el-table-column>
      <el-table-column
        prop="showIndex"
        label="是否显示在列表"
        width="120">
        <template slot-scope="scope">
          {{!!scope.row.showIndex ? '是' : ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="splitMark"
        label="分隔规则"
        width="300">
      </el-table-column>
      <el-table-column label="操作" width="240px">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" v-if="!scope.row.children">编辑</el-button>
          <el-button
          size="mini"
          type="primary"
          @click="handleContinue(scope.$index, scope.row)" v-if="scope.row.children">续传</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>

    <el-dialog title="编辑gif" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="gif名称">
          <el-input v-model="form.gifName"></el-input>
        </el-form-item>
        <el-form-item label="模版描述">
          <el-input v-model="form.gifDesc" v-if="form.showIndex"></el-input>
        </el-form-item>
        <el-form-item label="gif内容" >
          <el-input v-model="form.gifContent"></el-input>
        </el-form-item>
        <el-form-item label="字体颜色" prop="gifContent">
          <el-color-picker v-model="form.color"></el-color-picker>
        </el-form-item>
        <el-form-item label="gif时长">
          <el-input v-model="form.gifTime"></el-input>
        </el-form-item>
        <el-form-item label="分隔规则">
          <el-input v-model="form.splitMark"></el-input>
        </el-form-item>
        <el-form-item label="是否显示在首页">
          <el-switch v-model="form.showIndex"></el-switch>
        </el-form-item>
        <el-form-item label="版权">
          <el-input v-model="form.gifCopyRight"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        @size-change="sizeChange"
        @current-change="pageChange"

        >
      </el-pagination>
    </div>

  </div>
</template>
<script>
export default {
  name: 'list',
  data: function() {
    return {
      tableData: [],
      form: {
        id: '',
        gifName: '',
        gifContent: '',
        gifTime: '',
        showIndex: false,
        splitMark: '',
        gifDesc: '',
        color: ''
      },
      dialogFormVisible: false,
      total: 0,
      page: 1,
      size: 10,
      isParent: false
    }
  },
  created() {
    this.getLists()
  },
  methods: {
    handleContinue(index, row) {
      this.$router.push({ name: 'gifAdd', params: { gifId: row.gifId }})
    },
    getLists() {
      const params = {
        page: this.page,
        size: this.size
      }
      this.$get('gif/getGifSource', params).then(res => {
        if (res.code === 1) {
          this.tableData = res.data.lists
          this.total = res.data.total
        }
      })
    },
    load(tree, treeNode, resolve) {
      this.$get('gif/getGifDetail', { gifId: tree.gifId }).then(res => {
        if (res.code === 1) {
          resolve(res.data.rows)
        } else {
          resolve([])
        }
      })
    },
    handleEdit(index, row) {
      this.form.gifName = row.gifName
      this.form.gifDesc = row.gifDesc
      this.form.gifId = row.gifId
      this.form.id = row.id
      this.form.gifContent = row.gifContent
      this.form.gifTime = row.gifTime
      this.form.splitMark = row.splitMark
      this.form.showIndex = row.showIndex
      this.form.color = row.color
      this.form.gifCopyRight = row.gifCopyRight
      this.dialogFormVisible = true
    },
    onSubmit() {
      this.$post('gif/updateGifDetail', this.form).then(res => {
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          this.dialogFormVisible = false
          this.getLists()
        } else {
          this.$message.error('编辑失败')
        }
      })
    },
    handleDelete(index, row) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = ''
        const params = {}
        if (row.children) {
          url = 'gif/delGifSource'
          params.gifId = row.gifId
        } else {
          url = 'gif/delGif'
          params.id = row.id
        }
        this.$post(url, params).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getLists()
          }
        })
      }).catch(() => {

      })
    },
    pageChange(e) {
      this.page = e
      this.getLists()
    },
    sizeChange(e) {
      this.page = 1
      this.size = e
      this.getLists()
    }
  }
}
</script>
